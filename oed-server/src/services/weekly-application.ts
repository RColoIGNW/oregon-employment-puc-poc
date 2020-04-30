import { Request, Response } from 'express'
import fb from 'firebase-admin'

import firebase from '../util/firebase'
import { logger } from '../util/logger'

const log = logger('api:application-information')

const db = firebase.firestore()

const createWeeklyApplication = async (req: Request, res: Response) => {
  try {
    if (!req.body) { throw new Error('Request Body Required') }

    const requestBody = { ...req.body, lastModified: new Date().toISOString() }
    const countRef = db.collection('weekly-applications-count').doc('pua-applications')
    const applicationRef = db.collection('weekly-applications').doc()

    return db
      .runTransaction(async (t) => {
        const countDoc = await t.get(countRef)
        const increment = fb.firestore.FieldValue.increment(1)
        t[countDoc.data() ? 'update' : 'set'](countRef, { applicationCount: increment })
        t.set(applicationRef, requestBody)
        return Promise.resolve('Transaction Successful!')
      })
      .then(async () => {
        const doc = await applicationRef.get()
        const application = doc.data()
        if (application.isSubmitted){
          // publish to pub/sub for downstream services
          log(JSON.stringify(application), 'Published to pub/sub!')
        }
        return res.status(200).json({ success: true, applicationId: doc.id })
      })
      .finally(() => log('SubmitApplicationInformation Transaction Finished!'))
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default {
  createWeeklyApplication,
}
