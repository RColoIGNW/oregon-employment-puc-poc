import { argv } from 'yargs'

import admin from '../src/util/firebase'

const [email] = argv._

admin
  .auth()
  .getUserByEmail(email)
  .then((user: any) => admin.auth().setCustomUserClaims(user.uid, { admin: true }))
  .then(() =>
    admin
      .auth()
      .generateEmailVerificationLink(email)
      .then((link: string) => {
        console.info(
          "\x1b[32m%s\x1b[0m",
          `*** Added Admin Role to ${email}. Please go to`,
        )
        console.info(
          "\x1b[34m%s\x1b[0m",
          `${link}`,
        )
        console.info("\x1b[32m%s\x1b[0m",
        `to finish the process. ***`)
      })
  )
  .catch(console.error)
  .finally(() => process.exit(0))
