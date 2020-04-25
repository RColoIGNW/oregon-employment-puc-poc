import Applicant from '../models/Applicant'
import EmploymentRecord from "../models/EmploymentRecord"
import storage from '../util/storage'
import useApplicantFormApi from "./useApplicantFormApi"

export default (formData?: Partial<Applicant>) => {
  const api = useApplicantFormApi()

  const loadApplication = () => {
    //load from API
    //save to localstorage
    return formData
  }

  const saveSectionA = (applicant: Applicant) => {
    storage.save(storage.StorageKey.SectionA, applicant)
    api.saveForm(applicant)
  }

  const saveSectionB = (employmentRecords: EmploymentRecord[]) => {
    storage.save(storage.StorageKey.SectionB, employmentRecords)
  }

  return {
    loadApplication,
    saveSectionA,
    saveSectionB,
    formData,
  }
}
