module.exports = {
  hosts: process.env.MAIL_HOSTS.split('|'),
  ports: process.env.MAIL_PORTS.split('|'),
  users: process.env.MAIL_USERS.split('|'),
  passwords: process.env.MAIL_PASSWORDS.split('|')
}
