import Ajv from 'ajv'
import type { RequestHandler } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'

import schema from '../interfaces/application-schema.json'
import log from './logger'

export const validateApplicationRequest: RequestHandler = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {

  const ajv = new Ajv()
  const valid = ajv.validate(schema, req.body)
  if (!valid) {
    log.error(ajv.errors)
    return res.status(400).send(ajv.errors)
  }
  next()
}
