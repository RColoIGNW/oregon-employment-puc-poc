import fs from 'fs'

import { Request, Response } from 'express'
import fillPdf from 'fill-pdf'

import firebase from '../util/firebase'
import getMappings from '../util/mappings'

const db = firebase.firestore()
const pdfTemplatePath = __dirname + '/../templates/pdf-template.pdf'

export const generatePdf = (collectionName: string, req: Request, res: Response) => {
  return db
    .collection(collectionName)
    .doc(req.params.applicationId)
    .get()
    .then((doc) => {
      const mappedForm = getMappings(doc.data())
      const extendArgs = ['approved', 'submitted', 'deny'].includes(doc?.data()?.status?.toLowerCase?.()) ? ['flatten'] : []
      fillPdf.generatePdf(mappedForm, pdfTemplatePath, extendArgs, (err: Error, output: Buffer): void => {
        if (err) { throw new Error('Failed to generate pdf') }
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-disposition', 'attachment; filename=application.pdf')
        fs.writeFile('./temp.pdf', output, err => {
          if (err) {
            console.error(err)
            throw new Error('Failed to write temp file')
          }
        })
        const file = fs.createReadStream('./temp.pdf');
        file.pipe(res)
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
