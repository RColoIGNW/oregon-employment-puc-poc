import { Request, Response } from 'express'

import firebase from '../util/firebase'

const db = firebase.firestore()

export const submitApplicantInformation = async (req: Request, res: Response) => {
  const requestBody = req.body || {
    // add mock data
  }

  const applicationsRef = db.collection('users').doc('some-uid').collection('pua-applications').doc()
  const userRef = db.collection('users').doc('some-uid') // TODO: get from req.body.uid or add to request headers

  db.runTransaction(async (t) => {
    const userDoc = await t.get(userRef)
    const { applicationCount } = userDoc.data()
    t.update(userRef, { applicationCount: applicationCount ? applicationCount + 1 : 1 })
    t.set(applicationsRef, requestBody)
    return Promise.resolve('Transaction Successful!')
  }).catch(error => res.status(400).send(error))

  return res.status(200).json({
    success: true
  })
}

export default submitApplicantInformation
