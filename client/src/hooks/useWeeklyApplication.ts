
import useWeeklyFormApi from "./useWeeklyFormApi"
import weeklyQuestions from "../models/weeklyQuestions"

import ApplicationModel from '../models/Application'
import { useState } from "react"


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
    setApplication({...weeklyApplication})
    console.log(application)
  }

  const handleEmploymentChange = (employmentRecords: ApplicationModel) => {
    setApplication({...application, employmentHistory: employmentRecords.employmentRecords})
    console.log(application)
  }

  const save = async (application: Partial<weeklyQuestions>): Promise<string> => {

    return  await api.saveApplication(application)
  }

  // todo getting rid of this, not sure if I can yet though
  // const localSave = (weeklyApplication:  weeklyQuestions) => {
  //   storage.save('weekly-application', weeklyApplication)
  // }

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
