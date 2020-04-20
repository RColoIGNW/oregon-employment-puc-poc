import { Request, Response } from 'express'

import firebase from '../util/firebase'

const db = firebase.firestore()

export const getApplicants = async (_: Request, res: Response) => {
  try {
    const applications: any = [] // TODO: add types
    await db
      .collection('users')
      .orderBy('application')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          applications.push(doc.data())
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
