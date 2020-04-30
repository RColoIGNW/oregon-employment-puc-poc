import { Request, Response } from 'express'
import fb from 'firebase-admin'
import Validator from 'validatorjs'

import firebase from '../util/firebase'
import { logger } from '../util/logger'

const log = logger('api:application-information')

const db = firebase.firestore()

const rules = {
  'isSubmitted': 'boolean',
  'address.street': 'string',
  'address.city': 'string',
  'address.state': 'string',
  'address.zipCode': 'string',
  'firstName': 'string',
  'middleName': 'string',
  'lastName': 'string',
  'ssn': 'string',
  'dob': 'string',
  'phone': 'string',
  'gender': 'string',
  'isHispanicLatino': 'boolean',
  'contactMethod.phone': 'string',
  'contactMethod.email': 'string',
  'races.*.americanIndianOrAlaskaNative': 'string',
  'races.*.asian': 'string',
  'races.*.hawaiianNativeOrOtherPacificIslander': 'string',
  'races.*.white': 'string',
  'races.*.blackOrAfricanAmerican': 'string',
  'races.*.other': 'string',
  'employmentRecord.*employer.name': 'string',
  'employmentRecord.*employer.address.street': 'string',
  'employmentRecord.*employer.address.city': 'string',
  'employmentRecord.*employer.address.state': 'string',
  'employmentRecord.*employer.address.zipCode': 'string',
  'employmentRecord.*employer.phone': 'string',
  'employmentRecord.started': 'date',
  'employmentRecord.ended': 'date',
  'uid': 'required|string',
}

const createApplication = async (req: Request, res: Response) => {
  try {
    if (!req.body) { throw new Error('Request Body Required') }

    // const validation = new Validator(req.body, rules)
    // if (validation.fails()) { return res.status(400).send(validation.errors) }

    const requestBody = { ...req.body, lastModified: new Date().toISOString() }
    const userId = requestBody.userId
    const countRef = db.collection('applications-count').doc('pua-applications')
    const applicationRef = db.collection('applications').doc()

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
  createApplication,
}
