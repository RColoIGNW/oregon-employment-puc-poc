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

const getWeeklyApplications = async (req: Request, res: Response) => {
  try {
    const applications: any = [] // TODO: add types
    await db
      .collection('weekly-applications')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          applications.push({id: doc.id, ...doc.data()})
        })
      })

    return res.status(200).send({
      success: true,
      response: applications
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getWeeklyApplicationsByUser = async (req: Request, res: Response) => {
  try {
    const applications: any = [] // TODO: add types
    await db
      .collection('weekly-applications')
      .where('userId', '==', req.params.userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          applications.push({id: doc.id, ...doc.data()})
        })
      })

    return res.status(200).send({
      success: true,
      response: applications
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getWeeklyApplicationById = async (req: Request, res: Response) => {
  try {
    let application: any = undefined
    await db
      .collection('weekly-applications')
      .doc(req.params.id)
      .get()
      .then(doc => {
        application = { id: doc.id, ...doc.data() }
      })

    return res.status(200).send({
      success: true,
      response: application
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const deleteWeeklyApplication = async (req: Request, res: Response) => {
  try {
    await db
      .collection('weekly-applications')
      .doc(req.params.id)
      .delete()

    return res.status(204).send({
      success: true
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateWeeklyApplication = async (req: Request, res: Response) => {
  try {
    const { id, ...applicationInfo } = req.body;
    //TODO: Validate
    await db
      .collection('weekly-applications')
      .doc(req.params.id)
      .update(applicationInfo)

    return res.status(204).send({
      success: true
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default {
  createWeeklyApplication,
  getWeeklyApplications,
  getWeeklyApplicationsByUser,
  getWeeklyApplicationById,
  deleteWeeklyApplication,
  updateWeeklyApplication
}
