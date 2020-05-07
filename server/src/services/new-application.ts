import { Request, Response } from 'express'
import fb from 'firebase-admin'

import ApplicationSchema from '../interfaces/application.interface'
import firebase from '../util/firebase'
import log from '../util/logger'

const db = firebase.firestore()

const submitApplication = async (req: Request, res: Response) => {
  try {
    const requestBody: Partial<ApplicationSchema> = {
      ...req.body,
      lastModified: fb.firestore.Timestamp.now(),
      status: 'submitted',
      dateApplied: fb.firestore.Timestamp.now(),
    }
    const applicationRef = db.collection('applications').doc(req.params.id)

    return db
      .runTransaction(async (t) => {
        t.update(applicationRef, requestBody)
        return Promise.resolve('Transaction Successful!')
      })
      .then(async () => {
        const doc = await applicationRef.get()
        const application = doc.data()
        // publish to pub/sub for downstream services
        log.info(JSON.stringify(application), 'Published to pub/sub!')
        return res.status(200).json({ success: true })
      })
      .finally(() => log.info('SubmitWeeklyApplication Transaction Finished!'))
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default {
  submitApplication,
}
