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
    user: 'niltea@nilgiri-tea.net', // ユーザー名
    pass: '', // パスワード
  },
};

const mail = {
  from   : 'no-return@nilgiri-tea.net',
  replyTo: 'niltea@nilgiri-tea.net',
  to     : 'niltea@nilgiri-tea.net',
  subject: 'Email Test Mail',
  text   : 'Email was sent!',
  html   : '<p>Email was sent!</p>',
};

(async () => {
  try {
    const transport = nodemailer.createTransport(options);
    const result = await transport.sendMail(mail);
    console.log('+++ Sent +++');
    console.log(result);
  } catch (err) {
    console.log('--- Error ---');
    console.log(err);
  }
})();
