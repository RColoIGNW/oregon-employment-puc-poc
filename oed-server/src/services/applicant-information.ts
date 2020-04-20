import { Request, Response } from 'express'
import fb from 'firebase-admin'

import firebase from '../util/firebase'
import { logger } from '../util/logger'

const db = firebase.firestore()

export const submitApplicantInformation = async (req: Request, res: Response) => {
  const requestBody = req.body || {
    uid: "123-fake-uid", // TODO: get from req.body.uid or add to request headers
    // add mock data
  }
  const uid = requestBody.uid || '123-fake-uid'
  const countRef = db.collection('applications-count').doc('pua-applications')
  const applicationsRef = db.collection('users').doc(uid)

  return db.runTransaction(async (t) => {
    const countDoc = await t.get(countRef)
    const applicationDoc = await t.get(applicationsRef)
    const increment = fb.firestore.FieldValue.increment(applicationDoc.data() ? 0 : 1);
    t[countDoc.data() ? 'update' :  'set'](countRef, { applicationCount: increment })
    t[applicationDoc.data() ? 'update' : 'set'](applicationsRef, requestBody)
    return Promise.resolve('Transaction Successful!')
  })
  .then(() => res.status(200).json({ success: true}))
  .catch(error => res.status(400).send(error.toString()))
  .finally(() => logger('SubmitApplicationInformation Transaction Finished!'))
}

export default submitApplicantInformation
