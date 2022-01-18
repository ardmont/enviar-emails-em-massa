const nodemailer = require('nodemailer')
const mails = require('./mails')

module.exports = () => {
  const indice = Math.floor(Math.random() * mails.users.length)

  const mailConf = {
    host: mails.hosts[indice],
    port: mails.ports[indice],
    auth: {
      user: mails.users[indice],
      pass: mails.passwords[indice]
    }
  }

  return nodemailer.createTransport(mailConf)
}
