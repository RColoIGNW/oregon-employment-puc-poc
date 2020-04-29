import Applicant from "./Applicant"

export default interface weeklyQuestions extends Applicant{
  ableToWork: boolean,
  awayFromResidence: boolean,
  seekedEmployment: boolean,
  veteran: boolean,
  temporaryUnemployment: boolean
}
