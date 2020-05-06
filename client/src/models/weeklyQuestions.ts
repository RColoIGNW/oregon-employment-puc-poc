import EmploymentRecord from "./EmploymentRecord"

export default interface weeklyQuestions {
  failedToAcceptOffer: boolean,
  quitJob: boolean,
  firedOrSuspended: boolean,
  ableToWork: boolean,
  awayFromResidence: boolean,
  veteran: boolean,
  temporaryUnemployment: boolean,
  employmentHistory?: EmploymentRecord[]
  applicationId?: string
}
