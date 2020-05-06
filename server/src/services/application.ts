import { Request, Response } from 'express'
import fbAdmin from 'firebase-admin'

import firebase from '../util/firebase'
import log from '../util/logger'

const db = firebase.firestore()

const getCollectionByName = async (collectionName: string, _: Request, res: Response) => {
  try {
    const response: any = []
    await db
      .collection(collectionName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          response.push({id: doc.id, ...doc.data()})
        })
      })
    return res.status(200).send({
      success: true,
      response
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getCollectionByUser = async (collectionName: string, req: Request, res: Response) => {
  try {
    const response: any = []
    await db
      .collection(collectionName)
      .where('userId', '==', req.params.userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          response.push({id: doc.id, ...doc.data()})
        })
      })

    return res.status(200).send({
      success: true,
      response
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getDocumentById = async (collectionName: string, req: Request, res: Response) => {
  try {
    let response: any = undefined
    await db
      .collection(collectionName)
      .doc(req.params.id)
      .get()
      .then(doc => {
        response = { id: doc.id, ...doc.data() }
      })

    return res.status(200).send({
      success: true,
      response
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const deleteDocumentById = async (collectionName: string, req: Request, res: Response) => {
  try {
    await db
      .collection(collectionName)
      .doc(req.params.id)
      .delete()

    return res.status(204).send({
      success: true
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateDocumentById = async (collectionName: string, req: Request, res: Response) => {
  try {
    const { id, ...applicationInfo } = req.body;
    await db
      .collection(collectionName)
      .doc(req.params.id)
      .update({
        ...applicationInfo,
        lastModified: fbAdmin.firestore.Timestamp.now(),
      })

    return res.status(204).send({
      success: true
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const changeDocumentStatusById = async (collectionName: string, req: Request, res: Response) => {
  try {
    await db
      .collection(collectionName)
      .doc(req.params.id)
      .update({
        ...req.body,
        lastModified: fbAdmin.firestore.Timestamp.now()
      })

    return res.status(204).send({
      success: true
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export enum ApplicationStatus {
  IN_PROGRESS = 'in progress',
  SUBMITTED = 'submitted',
  DENY = 'deny',
  APPROVED = 'approved'
}

const createDocument = async (collectionName: string, subCollectionName: string, req: Request, res: Response) => {
  try {
    if (!req.body) { throw new Error('Request Body Required') }

    const requestBody = { ...req.body, lastModified: fbAdmin.firestore.Timestamp.now() }
    const countRef = db.collection(collectionName).doc(subCollectionName)
    const applicationRef = db.collection(collectionName).doc()

    await db
      .runTransaction(async (t) => {
        const countDoc = await t.get(countRef)
        const increment = fbAdmin.firestore.FieldValue.increment(1)
        t[countDoc.data() ? "update" : "set"](countRef, {
          applicationCount: increment,
          lastModified: fbAdmin.firestore.Timestamp.now(),
          status: ApplicationStatus.IN_PROGRESS,
          dateCreated: fbAdmin.firestore.Timestamp.now(),
        });
        t.set(applicationRef, requestBody)
        return Promise.resolve('Transaction Successful!')
      })

    const doc = await applicationRef.get()
    return res.status(200).json({ success: true, applicationId: doc.id })
  } catch (error) {
    res.status(400).json({ error })
  } finally {
    log.info('createApplication Transaction Finished!')
  }
}

export default {
  getCollectionByName,
  getCollectionByUser,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
  changeDocumentStatusById,
  createDocument,
}
