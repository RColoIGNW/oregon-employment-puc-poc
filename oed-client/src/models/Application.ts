import Applicant from './Applicant'
import EmploymentRecord from './EmploymentRecord'

export default interface Application {
  id: string
  userId: string
  applicant?: Applicant
  employmentRecords?: EmploymentRecord[]
  status?: ApplicationStatus,
  lastModified?: Date
}
