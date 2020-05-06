import { Request, Response } from 'express'
import fillPdf from 'fill-pdf'

import firebase from '../util/firebase'
import log from '../util/logger'
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
        if (err) {
          log.error(err)
          throw new Error('Failed to generate pdf')
        }

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Length', output.length)
        res.setHeader('Content-disposition', 'attachment; filename=application.pdf')

        res.send(output)
      })
    })
    .catch((error) => {
      log.error(error)
      res.status(400).send(error)
    })
}

export default {
  generatePdf
}
