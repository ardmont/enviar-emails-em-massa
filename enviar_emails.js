const env = process.env.NODE_ENV || 'development'
const fs = require('fs')
const csv = require('csv-parser')
require('dotenv').config({ path: `.env.${env}` })

const getRandomMailer = require('./get_random_mailer')

results = []

fs.createReadStream('emails.csv')
  .pipe(csv({ separator: ',' }))
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    results.forEach(async (result) => {
      await enviarEmail(result.email)
    })
  })
  .on('error', (e) => {
    console.log(e)
  })

async function enviarEmail(email) {
  const mailer = getRandomMailer()

  mailer.sendMail({
    from: `TESTE <${mailer.options.auth.user}>`,
    to: email,
    subject: 'TESTE',
    html: `TESTE`
  }).then(() => console.log(`Email enviado para ${email}`))
    .catch(e => {
      console.log(`Falha ao enviar email ${e}`)
      enviarEmail(email)
    })
}



