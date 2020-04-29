import Applicant from './Applicant'
import EmploymentRecord from './EmploymentRecord'
import { AnswerModel } from './Answer'

export interface SaveApplicantForm extends Applicant {
  employmentRecords?: EmploymentRecord[]
  uid: string /* get from firebase.auth().currentUser.uid */
  isSubmitted?: boolean /* set to true for final submit */
  adminNote?: string /* used by admin for approvals */
  // add remaining fields from remaining sections
  answersSectionC: AnswerModel[]
  answersSenctionD: AnswerModel[]
  answersSectionE: AnswerModel[]
  answersSectionF: AnswerModel[]
}

export default SaveApplicantForm
