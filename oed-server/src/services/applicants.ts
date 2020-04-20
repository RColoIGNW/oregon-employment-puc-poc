import { Request, Response } from 'express'

import firebase from '../util/firebase'

// import { logger } from '../util/logger'

const db = firebase.firestore()

export const getApplicants = async (_: Request, res: Response) => {
  const applications: any = []
  await db
    .collection('users')
    .orderBy('application')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        applications.push(doc.data())
      })
    })

  return res.send({
    success: true,
    response: applications
  })
}
