import Application from '../models/Application'
import storage from '../util/storage'
import useWeeklyFormApi from "./useWeeklyFormApi"
import weeklyQuestions from "../models/weeklyQuestions"
import Applicant from "../models/Applicant"
import EmploymentRecord from "../models/EmploymentRecord"
import ApplicationModel from '../models/Application'

export default () => {
  const api = useWeeklyFormApi()

  const load = () => {
    //load from API
    //save to localstorage
  }

  const defaultValue = {
    ableToWork: true,
    awayFromResidence: false,
    seekedEmployment: true,
    veteran: false,
    temporaryUnemployment: false,
    employmentHistory: []
  }

  let currentValue: Partial<weeklyQuestions>  =  defaultValue

  const handleChange = (weeklyApplication: Partial<weeklyQuestions>) => {
    currentValue = weeklyApplication
  }

  const handleEmploymentChange = (employmentRecords: ApplicationModel) => {
    currentValue.employmentHistory = employmentRecords.employmentRecords
    console.log(currentValue)
  }

  const save = async (application: Application): Promise<string> => {
    return  await api.saveApplication(application)
  }

  const localSave = (weeklyApplication:  weeklyQuestions) => {
    storage.save('weekly-application', weeklyApplication)
  }

  return {
    currentValue,
    handleChange,
    handleEmploymentChange,
    load,
    localSave,
    save
  }
}
