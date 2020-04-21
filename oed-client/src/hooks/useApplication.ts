import Applicant from "../models/Applicant"
import storage from '../utils/storage'

export default () => {
  //const usedesmond

  const loadApplication = () => {
    //load from API
    //save to localstorage
  }

  const saveSectionA = (applicant: Applicant) => {
    storage.save(storage.StorageKey.SectionA, applicant)
  }

  return {
    loadApplication,
    saveSectionA
  }
}
