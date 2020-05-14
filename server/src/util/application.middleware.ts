import Ajv from 'ajv'
import type { RequestHandler } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'

import schema from '../interfaces/application-schema.json'
import log from './logger'

export const validateApplicationRequest: RequestHandler = (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  const ajv = new Ajv()
  ajv.validate(schema, req.body)
  log.info('application schema validation check:', JSON.stringify(ajv.errors))
  if (ajv.errors?.length) {
    log.error(ajv.errors)
    log.info('invalid request sent: ',  JSON.stringify(req.body))
    return res.status(400).send(ajv.errors)
  }
  next()
}
