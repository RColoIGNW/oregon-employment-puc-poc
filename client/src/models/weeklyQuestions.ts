import Applicant from "./Applicant"
import EmploymentRecord from "./EmploymentRecord"

export default interface weeklyQuestions extends Applicant{
  ableToWork: boolean,
  awayFromResidence: boolean,
  seekedEmployment: boolean,
  veteran: boolean,
  temporaryUnemployment: boolean,
  employmentHistory: EmploymentRecord[]
}
