import { Address } from './Address'
import Applicant from './Applicant'
import { ContactMethod } from './ContactMethod'
import EmploymentRecord from './EmploymentRecord'

export interface SaveApplicantForm extends Applicant {
  address?: Address
  contactMethod?: ContactMethod
  employmentRecord?: EmploymentRecord
  uid: string /* get from firebase.auth().currentUser.uid */
  isSubmitted?: boolean /* set to true for final submit */
  adminNote: string /* used by admin for approvals */
  // add remaining fields from remaining sections
}

export default SaveApplicantForm
