import Applicant from "../models/Applicant"
import storage from '../utils/storage'
import EmploymentRecord from "../models/EmploymentRecord"
import { QuestionModel } from "../models/Question"
import { AnswerModel } from "../models/Answer"

export default () => {
  //const usedesmond

  const loadApplication = () => {
    //load from API
    //save to localstorage
  }

  const saveSectionA = (applicant: Applicant) => {
    storage.save(storage.StorageKey.SectionA, applicant)
  }

  const saveSectionB = (employmentRecords: EmploymentRecord[]) => {
    storage.save(storage.StorageKey.SectionB, employmentRecords)
  }

  const saveSectionC = (answers: AnswerModel[]) => {
    console.log('Save Section C')
    storage.save(storage.StorageKey.SectionC, answers)
  }

  const saveSectionD = (questions: QuestionModel[]) => {
    storage.save(storage.StorageKey.SectionD, questions)
  }

  const saveSectionE = (questions: QuestionModel[]) => {
    storage.save(storage.StorageKey.SectionE, questions)
  }
  
  const saveSectionF = (questions: QuestionModel[]) => {
    storage.save(storage.StorageKey.SectionF, questions)
  }

  return {
    loadApplication,
    saveSectionA,
    saveSectionB,
    saveSectionC,
    saveSectionD,
    saveSectionE,
    saveSectionF
  }
}
