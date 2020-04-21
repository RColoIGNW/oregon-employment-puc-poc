import storage from '../utils/storage'
import EmploymentRecord from '../models/EmploymentRecord'

export default () => {
  let currentValue: EmploymentRecord[] = storage.load(storage.StorageKey.SectionB) || []

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