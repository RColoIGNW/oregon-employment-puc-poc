import WorkSearchRecord from "./WorkSearchRecord"

export default interface weeklyQuestions {
  failedToAcceptOffer: boolean,
  quitJob: boolean,
  firedOrSuspended: boolean,
  awayFromResidence: boolean,
  ableToWork: boolean,
  ableToReportToWork: boolean,
  searchedForWork: boolean,
  didYouWorkLastWeek: boolean,
  workSearchRecords?: WorkSearchRecord[]
  applicationId?: string
}
