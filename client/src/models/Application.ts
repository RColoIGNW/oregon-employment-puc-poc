import { AnswerModel } from "./Answer"
import Applicant from "./Applicant"
import { ApplicationStatus } from "./ApplicationStatus"
import EmploymentRecord from "./EmploymentRecord"

export default interface Application {
  id: string
  userId: string
  applicant?: Applicant
  employmentRecords?: EmploymentRecord[]
  status?: ApplicationStatus
  dateCreated?: Date
  lastModified?: Date
  answers?: AnswerModel[]
  isCertified: boolean
  certifiedBy: string
  dateApplied?: Date
}
