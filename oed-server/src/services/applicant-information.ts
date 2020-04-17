import { Request, Response } from 'express'

export const submitApplicantInformation = (req: Request, res: Response) => {
  // TODO: write to firestore --> return mock data
  return res.status(200).json({
    success: true
  })
}

export default testService
