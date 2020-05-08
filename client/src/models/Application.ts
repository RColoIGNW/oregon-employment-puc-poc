import Applicant from './Applicant'
import EmploymentRecord from './EmploymentRecord'
import { AnswerModel } from './Answer'
import { ApplicationStatus } from './ApplicationStatus'

export default interface Application {
  id: string
  userId: string
  applicant?: Applicant
  employmentRecords?: EmploymentRecord[]
  status?: ApplicationStatus,
  dateCreated?: Date,
  lastModified?: Date,
  answers?: AnswerModel[]
  isCertified: boolean
  certifiedBy: string
  submitted?: Date
}
