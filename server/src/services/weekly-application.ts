import { Request, Response } from 'express'
import fb from 'firebase-admin'

import firebase from '../util/firebase'
import log from '../util/logger'

const db = firebase.firestore()

const submitWeeklyApplication = async (req: Request, res: Response) => {
  try {
    const requestBody = {
      ...req.body,
      lastModified: fb.firestore.Timestamp.now(),
      dateApplied: fb.firestore.Timestamp.now(),
    }
    const applicationRef = db.collection('weekly-applications').doc(req.params.id)

    return db
      .runTransaction(async (t) => {
        t.update(applicationRef, requestBody)
        return Promise.resolve('Transaction Successful!')
      })
      .then(async () => {
        // TODO: add downstream service notification
        // const doc = await applicationRef.get()
        // const application = doc.data(
        // // publish to pub/sub for downstream services
        // log(JSON.stringify(application), 'Published to pub/sub!'
        return res.status(200).json({ success: true })
      })
  } catch (error) {
    res.status(400).json({ error })
  } finally {
    log.info('SubmitWeeklyApplication Transaction Finished!')
  }
}

export default {
  submitWeeklyApplication,
}
