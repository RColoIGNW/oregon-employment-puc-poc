import Applicant from './Applicant'
import EmploymentRecord from './EmploymentRecord'
import { AnswerModel } from './Answer'

export default interface Application {
  id?: string
  userId: string
  applicant?: Applicant
  employmentRecords?: EmploymentRecord[]
  status?: ApplicationStatus,
  lastModified?: Date,
  answers?: AnswerModel[]
}
