import { Request, Response } from 'express'

export const testService = (req: Request, res: Response) => {
  return res.send(req.body)
}

export default testService
