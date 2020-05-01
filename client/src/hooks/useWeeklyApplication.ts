
import useWeeklyFormApi from "./useWeeklyFormApi"
import weeklyQuestions from "../models/weeklyQuestions"

import ApplicationModel from '../models/Application'
import { useState } from "react"

import storage from '../util/storage'


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
    employmentHistory: [],
    applicationId: ''
  }

  const [application, setApplication] = useState(defaultValue)

  const handleChange = (weeklyApplication: weeklyQuestions) => {
    localSave({...weeklyApplication})
    setApplication({...weeklyApplication})
  }

  const handleEmploymentChange = (employmentRecords: ApplicationModel) => {
    localSave({...application, employmentHistory: employmentRecords.employmentRecords})

    setApplication({...application, employmentHistory: employmentRecords.employmentRecords})
  }

  const save = async (application: Partial<weeklyQuestions>): Promise<string> => {

    return  await api.saveApplication(application)
  }

  const localSave = (weeklyApplication:  weeklyQuestions) => {
    storage.save('weekly-application', weeklyApplication)
  }

  const submit = (application: Partial<weeklyQuestions>) => {
    return api.submitApplication(application)
  }


  return {
    application,
    handleChange,
    handleEmploymentChange,
    load,
    save,
    submit,
  }
}
