import nodemailer from 'nodemailer'
import { argv } from 'yargs'

import admin from '../src/util/firebase'

const [email] = argv._

const sendCustomVerificationEmail = async (link: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"IGNW Admin Script 👻" <foo@example.com>', // sender address
    to: 'pnw3dev@gmail.com', // list of receivers
    subject: "Verify Email for Admin Role ✔", // Subject line
    text: "Please verify your email to be granted the admin role", // plain text body
    html: `<b>Hello! Please verify your email to be granted as an admin role</b> <a href="${link}">Click to Verify</a>`, // html body
  })

  console.info("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.info(
    "\x1b[36m%s\x1b[0m",
    `Preview URL: ${nodemailer.getTestMessageUrl(info)}`
  );
}

admin
  .auth()
  .getUserByEmail(email)
  .then((user: any) => admin.auth().setCustomUserClaims(user.uid, { admin: true }))
  .then(() =>
    admin
      .auth()
      .generateEmailVerificationLink(email)
      .then((link: string) => {
        // Construct email verification template, embed the link and send
        // using custom SMTP server.
        return sendCustomVerificationEmail(link);
      })
  )
  .then(() =>
    console.info(
      "\x1b[32m%s\x1b[0m",
      `*** Added Admin Role to ${email}. Please go to the link in the terminal/console to finish the process. ***`
    )
  )
  .catch(console.error)
  .finally(() => process.exit(0))
