import Applicant from './Applicant'
import EmploymentRecord from './EmploymentRecord'

export default interface Application {
  id: string
  userId: string
  applicant?: Applicant
  employmentRecords?: EmploymentRecord[]
  isCertified: boolean
  certifiedBy: string
  status?: ApplicationStatus
  submitted?: Date
  lastModified?: Date
}
