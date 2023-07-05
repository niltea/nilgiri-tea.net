const { Router } = require('express');
const nodemailer = require('nodemailer');

// SMTP settings
const options = {
  host      : 'smtp-relay.gmail.com',
  port      : 465,
  secure    : true,
  requireTLS: false,
  tls       : {
    rejectUnauthorized: false,
  },
  auth: { // 認証情報
    user: process.env.MAIL_USERNAME, // ユーザー名
    pass: process.env.MAIL_APP_PASS, // パスワード
  },
};

const guessEventName = (eventID) => {
  switch (eventID) {
    case 'vggc':
      return 'VGGC';
    case 'holokle':
      return 'ホロクル';
    default:
      return 'イベント共通';
  }
};
const guessCategory = (inquiryCategory) => {
  switch (inquiryCategory) {
    case 'correction':
      return '申込内容変更';
    case 'addOptions':
      return 'オプション追加';
    case 'reportPayment':
      return '参加費入金連絡';
    default:
      return 'その他のご連絡・お問い合わせ';
  }
};

const createSubject = (payload) => {
  const eventName = guessEventName(payload.event);
  let html = '';
  html += `<p>イベント：${eventName}</p><p>`;
  if (!payload.isCircle) {
    html += `<p>お問い合わせ内容：<br>${payload.body.replace(/\n/g, '<br>')}</p>`;
    return {
      subject: `${eventName} - 一般参加/その他のお問い合わせ`,
      html,
    };
  }

  const inquiryCategory = payload.inquiryCategory;
  const categoryStr = guessCategory(inquiryCategory);

  html += `<p>サークル：${payload.circleName}<br>ペンネーム：${payload.name}</p>`;
  switch (inquiryCategory) {
    case 'correction':
      html += `<p>訂正内容：<br>${payload.body.replace(/\n/g, '<br>')}</p>`;
      break;
    case 'addOptions':
      html += `<p>通行証追加数：${payload.ticketCount}<br>椅子追加数：${payload.chairCount}</p><p>備考：<br>${payload.body.replace(/\n/g, '<br>')}</p>`;
      break;
    case 'reportPayment':
      html += `<p>入金日：${payload.paidDate}<br>入金額：${payload.paidPrice}<br>入金名義：<br>${payload.paidName}</p>`;
      break;
    default:
      html += `<p>お問い合わせ内容：<br>${payload.body.replace(/\n/g, '<br>')}</p>`;
  }
  return {
    subject: `${eventName} - ${categoryStr} / サークル: ${payload.circleName}`,
    html,
  };
};

const router = Router();
router.get('/mailer', (req, res) => {
  res.json({ id: '', text: 'can\'t get this mailer' });
});
// get data
router.post('/mailer', async (req, res) => {
  const payload = req.body.payload;
  const mail = createSubject(payload);
  const mailData = {
    from   : 'inquiry@nilgiri-tea.net',
    replyTo: payload.mail,
    to     : 'niltea@nilgiri-tea.net',
    subject: mail.subject,
    text   : 'Email was sent!',
    html   : mail.html,
  };
  try {
    const transport = nodemailer.createTransport(options);
    const sendMeResult = await transport.sendMail(mailData);
    mailData.to = payload.mail;
    mailData.replyTo = 'inquiry@nilgiri-tea.net';
    const sendThemResult = await transport.sendMail(mailData);
    // console.log('+++ Sent +++');
    // console.log(result);
    res.json({
      text  : 'ok',
      error : false,
      result: {
        sendMeResult,
        sendThemResult,
      },
    });
  } catch (err) {
    // console.log('--- Error ---');
    console.log(err);
    res.json({
      text : 'err',
      error: true,
      err,
    });
  }
});

module.exports = router;
