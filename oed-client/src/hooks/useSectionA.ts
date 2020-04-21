import Applicant from "../models/Applicant";
import storage from '../utils/storage'

export default () => {
  const defaultValue: Applicant = {
    firstName: '',
    middleName: '',
    lastName: '',
    ssn: '',
    dob: undefined,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    phone: '',
    email: '',
    gender: undefined,
    isHispanicLatino: undefined,
    contactMethod: undefined,
    races: []
  }

  let currentValue: Applicant = storage.load(storage.StorageKey.SectionA) || defaultValue

  const handleSubmit = (): { applicant: Applicant, hasErrors: boolean } => {
    return {
      applicant: currentValue,
      hasErrors: true
    }
  }

  const handleChange = (applicant: Applicant) => {
    currentValue = applicant
    console.log(currentValue)
  }

  return {
    currentValue,
    handleSubmit,
    handleChange
  }
}