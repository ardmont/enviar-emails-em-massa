const env = process.env.NODE_ENV || 'development'
const fs = require('fs')
const csv = require('csv-parser')
require('dotenv').config({ path: `.env.${env}` })

const getRandomMailer = require('./get_random_mailer')

let results = []

let writeStream = fs.createWriteStream('emails_enviados.csv')
writeStream.write('email')

fs.createReadStream('emails.csv')
  .pipe(csv({ separator: ',' }))
  .on('data', (data) => results.push(data))
  .on('end', async () => {   
    results.forEach(async (result) => {
      try {
        if (result.enviado === 'N') {
          await enviarEmail(result.email)
          console.log(`Email enviado para ${result.email}`)
          writeStream.write(`\n${result.email}`)
        }
      } catch (e) {
        console.log(`Falha ao enviar email: ${e}`)
      }
    })
  })
  .on('error', (e) => {
    console.log(e)
  })

writeStream.on('finish', () => {
  console.log('Emails enviados anotados!');
});

async function enviarEmail(email) {
  const mailer = getRandomMailer()
  const email_html = fs.readFileSync(__dirname + "/email_body.html", { encoding:'utf8' }).toString()

  return mailer.sendMail({
    from: `${process.env.MAIL_FROM} <${mailer.options.auth.user}>`,
    to: email,
    subject: `${process.env.MAIL_SUBJECT}`,
    html: email_html
  })
}
