const env = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `.env.${env}` })

console.log('Testando as configurações de SMTP disponíveis')

const nodemailer = require('nodemailer')

const mails = require('./mails')
for (let i = 0; i < mails.users.length; i++) {
  const mailConf = {
    host: mails.hosts[i],
    port: mails.ports[i],
    auth: {
      user: mails.users[i],
      pass: mails.passwords[i]
    }
  }

  const mailer = nodemailer.createTransport(mailConf)

  mailer.sendMail({
    from: `"Envio de emails em massa" <${mailer.options.auth.user}>`,
    to: process.env.MAIL_TEST_TO,
    subject: 'Teste de envio de email',
    html: `<h1>Email enviado com sucesso!</h1>
           <p>Este é um teste de envio de emails por smtp para aplicação de envio de emails em massa da SGDES</p>
          `
  }).then(() => console.log(`\x1b[42mOK\x1b[0m ${JSON.stringify(mailConf)} está funcionando`))
    .catch(e => {
      console.log(`\x1b[41m\x1b[30mFALHA!\x1b[0m\x1b[31m ${JSON.stringify(mailConf)} não está funcionando\x1b[0m`)
    })
}
