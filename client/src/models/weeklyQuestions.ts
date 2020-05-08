import WorkSearchRecord from "./WorkSearchRecord"

export default interface weeklyQuestions {
  failedToAcceptOffer: boolean,
  quitJob: boolean,
  firedOrSuspended: boolean,
  ableToWork: boolean,
  awayFromResidence: boolean,
  veteran: boolean,
  temporaryUnemployment: boolean,
  workSearchRecords?: WorkSearchRecord[]
  applicationId?: string
}
