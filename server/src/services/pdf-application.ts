import { Request, Response } from 'express'
import fillPdf from 'fill-pdf'

import firebase from '../util/firebase'
import getMappings from '../util/mappings'

const db = firebase.firestore()
const pdfTemplatePath = __dirname + '/../templates/pdf-template.pdf'

export const generatePdf = async (collectionName: string, req: Request, res: Response) => {
  await db
    .collection(collectionName)
    .doc(req.params.applicationId)
    .get()
    .then((doc) => {
      const mappedForm = getMappings(doc.data());
      fillPdf.generatePdf(mappedForm, pdfTemplatePath, (err, output) => {
        if (err) { throw new Error(err) }

        res.type('application/pdf')
        return res.send(output)
      })
    })
    .catch((error) => {
      console.error(error)
      res.status(400).send(error)
    })
}

export default {
  generatePdf
}
