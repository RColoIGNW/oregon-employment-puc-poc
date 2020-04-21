import Applicant from "../models/Applicant"
import storage from '../utils/storage'
import EmploymentRecord from "../models/EmploymentRecord"
import useApplicantFormApi from "./useApplicantFormApi"

export default () => {
  const api = useApplicantFormApi()

  const loadApplication = () => {
    //load from API
    //save to localstorage
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
    saveSectionB
  }
}
