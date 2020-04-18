import { Request, Response } from 'express'

import firebase from '../util/firebase'
import { logger } from '../util/logger'

const db = firebase.firestore()

export const submitApplicantInformation = async (req: Request, res: Response) => {
  const requestBody = req.body || {
    // add mock data
  }

  const applicationsRef = db.collection('users').doc('some-uid').collection('pua-applications').doc()
  const userRef = db.collection('users').doc('some-uid') // TODO: get from req.body.uid or add to request headers

  return db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef)
      const { applicationCount } = userDoc.data()
      t.update(userRef, { applicationCount: applicationCount ? applicationCount + 1 : 1 })
      t.set(applicationsRef, requestBody)
      return Promise.resolve('Transaction Successful!')
    })
    .then(() => res.status(200).json({ success: true}))
    .catch(error => res.status(400).send(error))
    .finally(() => logger('SubmitApplicationInformation Transaction Finished!'))
}

export default submitApplicantInformation
