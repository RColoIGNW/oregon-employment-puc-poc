import { Request, Response } from 'express'
import fb from 'firebase-admin'

import ApplicationSchema from '../interfaces/application.interface'
import firebase from '../util/firebase'
import log from '../util/logger'

const db = firebase.firestore()

const submitApplication = async (req: Request, res: Response) => {
  try {
    if (!req.body) { throw new Error('Request Body Required') }

    const requestBody: Partial<ApplicationSchema> = {
      ...req.body,
      lastModified: fb.firestore.Timestamp.now(),
      status: 'submitted',
      dateApplied: fb.firestore.Timestamp.now(),
    }
    const countRef = db.collection('applications-count').doc('pua-applications')
    const applicationRef = db.collection('applications').doc(req.params.id)

    return db
      .runTransaction(async (t) => {
        const increment = fb.firestore.FieldValue.increment(1)
        t.set(countRef, {
          applicationCount: increment,
          lastModified: fb.firestore.Timestamp.now(),
        })
        t.update(applicationRef, requestBody)
        return Promise.resolve('Transaction Successful!')
      })
      .then(async () => {
        const doc = await applicationRef.get()
        const application = doc.data()
        if (application.isSubmitted){
          // publish to pub/sub for downstream services
          log.info(JSON.stringify(application), 'Published to pub/sub!')
        }
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
