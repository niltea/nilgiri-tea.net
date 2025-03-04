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
  auth: {
    type: 'OAuth2',
    user: 'info@flpc.info',
  },
};
const inquiryAddr = 'inquiry@nilgiri-tea.net';

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
  if (!payload.isCircle) {
    html += `<p>イベント：${eventName}</p><p>お名前：${payload.name}</p>`;
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
      html += '<b>続いて<a href="https://nilgiri-tea.net/payment/options">お支払いページ</a>より、追加料金のお支払いを行ってください。<br>※1スペースあたり1枚を超える追加の場合、準備会のご連絡をお待ちください。<br><b>お申し込みより2日以内にお支払いがない場合は追加申請が無効となります。</b>';
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
    from   : inquiryAddr,
    replyTo: payload.mail,
    to     : 'niltea@nilgiri-tea.net',
    subject: mail.subject,
    text   : 'Email was sent!',
    html   : mail.html,
  };
  try {
    const transport = nodemailer.createTransport(options);
    // niltea宛に送信
    const sendMeResult = await transport.sendMail(mailData);
    // 送付先等を変えて控えメール送信
    mailData.html = '<p>本メールはお問い合わせの控えです。<br>なお、お問い合わせ内容によってはご回答いたしかねる場合があります。</p>' + mailData.html;
    mailData.to = payload.mail;
    mailData.replyTo = inquiryAddr;
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
