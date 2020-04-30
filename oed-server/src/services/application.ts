import { Request, Response } from 'express'

import firebase from '../util/firebase'

const db = firebase.firestore()

const getCollectionByName = async (collectionName: string, _: Request, res: Response) => {
  try {
    const response: any = [] // TODO: add types
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
    const response: any = [] // TODO: add types
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
    //TODO: Validate
    await db
      .collection(collectionName)
      .doc(req.params.id)
      .update(applicationInfo)

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
      .update(req.body)

    return res.status(204).send({
      success: true
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default {
  getCollectionByName,
  getCollectionByUser,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
  changeDocumentStatusById,
}
