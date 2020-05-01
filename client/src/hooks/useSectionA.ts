import Applicant from '../models/Applicant'
import storage from '../util/storage'

export default () => {
  const defaultValue: Applicant = {
    firstName: '',
    middleName: '',
    lastName: '',
    ssn: '',
    dob: undefined,
    address: {
      street:'',
      city: '',
      state: '',
      zipCode: '',
    },
    phone: '',
    email: '',
    gender: undefined,
    isHispanicLatino: undefined,
    contactMethod: undefined,
    races: [],
  }

  let currentValue: Partial<Applicant>  = storage.load(storage.StorageKey.SectionA) || defaultValue

  //TODO: Implement
  const handleSubmit = (): { applicant: Applicant, hasErrors: boolean } => {
    //TODO: Add validations
    return {
      applicant: currentValue as Applicant,
      hasErrors: false
    }
  }

  const handleChange = (applicant: Partial<Applicant>) => {
    currentValue = applicant
  }

  return {
    currentValue,
    handleSubmit,
    handleChange
  }
}
