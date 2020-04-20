import { Request, Response } from 'express'
import fb from 'firebase-admin'
import Validator from 'validatorjs'

import firebase from '../util/firebase'
import { logger } from '../util/logger'

const db = firebase.firestore()

const rules = {
  'address.street': 'string',
  'address.city': 'string',
  'address.state': 'string',
  'address.zipCode': 'string',
  'applicant.firstName': 'string',
  'applicant.middleName': 'string',
  'applicant.lastName': 'string',
  'applicant.ssn': 'string',
  'applicant.dob': 'string',
  'applicant.address': 'string',
  'applicant.phone': 'string',
  'applicant.gender': 'string',
  'applicant.isHispanicLatino': 'boolean',
  'applicant.contactMethod.phone': 'string',
  'applicant.contactMethod.email': 'string',
  'applicant.races.*.americanIndianOrAlaskaNative': 'string',
  'applicant.races.*.asian': 'string',
  'applicant.races.*.hawaiianNativeOrOtherPacificIslander': 'string',
  'applicant.races.*.white': 'string',
  'applicant.races.*.blackOrAfricanAmerican': 'string',
  'applicant.races.*.other': 'string',
  'contactMethod.phone': 'string',
  'contactMethod.email': 'string',
  'employer.name': 'string',
  'employer.address.street': 'string',
  'employer.address.city': 'string',
  'employer.address.state': 'string',
  'employer.address.zipCode': 'string',
  'employer.phone': 'string',
  'employmentRecord.employer.name': 'string',
  'employmentRecord.employer.address.street': 'string',
  'employmentRecord.employer.address.city': 'string',
  'employmentRecord.employer.address.state': 'string',
  'employmentRecord.employer.address.zipCode': 'string',
  'employmentRecord.employer.phone': 'string',
  'employmentRecord.started': 'date',
  'employmentRecord.ended': 'date',
  'gender': 'string',
}

export const submitApplicantInformation = async (req: Request, res: Response) => {
  try {
    const validation = new Validator(req.body, rules)
    if (validation.fails()) { return res.status(400).send(validation.errors) }

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
    .finally(() => logger('SubmitApplicationInformation Transaction Finished!'))
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default submitApplicantInformation
