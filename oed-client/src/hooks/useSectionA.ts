import Applicant from '../models/Applicant'
import SaveApplicantForm from '../models/SaveApplicantForm'
import storage from '../util/storage'

export default (formData?: SaveApplicantForm) => {
  const defaultValue: SaveApplicantForm|Applicant = {
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    dob: undefined,
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    phone: "",
    email: "",
    gender: undefined,
    isHispanicLatino: undefined,
    contactMethod: undefined,
    races: [],
    isSubmitted: false,
  }

  let currentValue: SaveApplicantForm|Applicant = formData || storage.load(storage.StorageKey.SectionA) || defaultValue

  const handleSubmit = (): { applicant: Applicant, hasErrors: boolean } => {
    return {
      applicant: currentValue,
      hasErrors: false
    }
  }

  const handleChange = (applicant: SaveApplicantForm|Applicant) => {
    currentValue = applicant
  }

  return {
    currentValue,
    handleSubmit,
    handleChange
  }
}
