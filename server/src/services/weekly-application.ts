import { Request, Response } from 'express'
import fb from 'firebase-admin'

import firebase from '../util/firebase'
import { logger } from '../util/logger'

const log = logger('api:application-information')
const db = firebase.firestore()

const submitWeeklyApplication = async (req: Request, res: Response) => {
  try {
    if (!req.body) { throw new Error('Request Body Required') }

    const requestBody = {
      ...req.body,
      lastModified: fb.firestore.Timestamp.now(),
      dateApplied: fb.firestore.Timestamp.now(),
    }
    const countRef = db.collection('weekly-applications-count').doc('pua-applications')
    const applicationRef = db.collection('weekly-applications').doc(req.params.id)

    return db
      .runTransaction(async (t) => {
        const increment = fb.firestore.FieldValue.increment(1)
        t.update(countRef, {
          applicationCount: increment,
          lastModified: fb.firestore.Timestamp.now(),
        })
        t.update(applicationRef, requestBody)
        return Promise.resolve('Transaction Successful!')
      })
      .then(async () => {
        // TODO: add downstream service notification
        // const doc = await applicationRef.get()
        // const application = doc.data()
        // if (application.isSubmitted){
        //   // publish to pub/sub for downstream services
        //   log(JSON.stringify(application), 'Published to pub/sub!')
        // }
        return res.status(200).json({ success: true })
      })
  } catch (error) {
    res.status(400).json({ error })
  } finally {
    log('SubmitWeeklyApplication Transaction Finished!')
  }
}

export default {
  submitWeeklyApplication,
}
