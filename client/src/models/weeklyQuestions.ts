import EmploymentRecord from "./EmploymentRecord"

export default interface weeklyQuestions {
  ableToWork: boolean,
  awayFromResidence: boolean,
  seekedEmployment: boolean,
  veteran: boolean,
  temporaryUnemployment: boolean,
  employmentHistory?: EmploymentRecord[]
  applicationId?: string
}
