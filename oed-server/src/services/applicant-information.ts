import { Request, Response } from 'express'

import firebase from '../util/firebase'
import { logger } from '../util/logger'

const db = firebase.firestore()

export const submitApplicantInformation = async (req: Request, res: Response) => {
  const requestBody = req.body || {
    uid: "123-fake-uid", // TODO: get from req.body.uid or add to request headers
    // add mock data
  }
  const uid = requestBody.uid || '123'
  const userRef = db.collection('users').doc(uid)
  const applicationsRef = userRef.collection('pua-applications').doc()

  return db.runTransaction(async (t) => {
    const userDoc = await t.get(userRef)
    const applicationDoc = await t.get(applicationsRef)
    const applicationCount = userDoc?.data()?.applicationCount
    t[userDoc.data() ? 'update' :  'set'](userRef, { applicationCount: applicationCount ? applicationCount + 1 : 1 })
    t[applicationDoc.data() ? 'update' : 'set'](applicationsRef, requestBody)
    return Promise.resolve('Transaction Successful!')
  })
  .then(() => res.status(200).json({ success: true}))
  .catch(error => res.status(400).send(error.toString()))
  .finally(() => logger('SubmitApplicationInformation Transaction Finished!'))
}

export default submitApplicantInformation
