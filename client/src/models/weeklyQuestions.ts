import Application from "./Application"
import EmploymentRecord from "./EmploymentRecord"

export default interface weeklyQuestions extends Application{
  ableToWork: boolean,
  awayFromResidence: boolean,
  seekedEmployment: boolean,
  veteran: boolean,
  temporaryUnemployment: boolean,
  employmentHistory?: EmploymentRecord[]
  applicationID?: string
}
