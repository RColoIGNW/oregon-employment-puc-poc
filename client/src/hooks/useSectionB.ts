import SaveApplicantForm from '../models/Application'
import EmploymentRecord from '../models/EmploymentRecord'
import storage from '../util/storage'

export default (formData?: Partial<SaveApplicantForm>) => {
  let currentValue: EmploymentRecord[] = formData || storage.load(storage.StorageKey.SectionB) || []

  const handleSubmit = (): { employmentRecords: EmploymentRecord[], hasErrors: boolean } => {
    return {
      employmentRecords: currentValue,
      hasErrors: false
    }
  }

  const handleChange = (employmentRecords: EmploymentRecord[]) => {
    currentValue = employmentRecords
  }

  return {
    currentValue,
    handleSubmit,
    handleChange
  }
}
