import { navigate } from "gatsby"
import { useContext, useEffect, useState } from "react"

import { steps } from '../components/weekly-form/WeeklyForm'
import weeklyQuestions from "../models/weeklyQuestions"
import { SnackBarContext } from "../providers/SnackbarProvider"
import storage from '../util/storage'
import useWeeklyFormApi from "./useWeeklyFormApi"

export default (props: { applicationId: string, isDisabled?: boolean }) => {
  const api = useWeeklyFormApi()
  const [activeStep, setActiveStep] = useState(parseInt(storage.load('weeklyActiveStep')) || 0)
  const snackbar = useContext(SnackBarContext)
  const defaultValue = {
    failedToAcceptOffer: null,
    quitJob: null,
    firedOrSuspended: null,
    ableToWork: null,
    awayFromResidence: null,
    ableToReportToWork: null,
    searchedForWork: null,
    didYouWorkLastWeek: null,
    tempLayoff: null,
    unionMember: null,
    workSearchRecords: [],
    applicationId: props?.applicationId || ''
  }
  const [application, setApplication] = useState(storage.load('weekly-application') || defaultValue)
  const { isDisabled } = props
  const disabled = !!isDisabled

  const load = () => {
    //TODO: Check Application in Progress (check storage) ask Continue or discard?
    const retrieveApplication = async (applicationId: string) => {
      const application = await api.getApplication(applicationId) // TODO: create new method to get weeklyForm app
      handleChange(application)
    }

    const createApplication = async () => {
      const app = {userId: localStorage.uid}
      const applicationId = await api.saveApplication(app as any) // TODO: create a new method to save weeklyForm app
      handleChange({ ...application, applicationId })

    }

    if (application?.applicationId) {
      retrieveApplication(application?.applicationId)
    } else {
      createApplication()
    }
  }



  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  const saveActiveStep = (step: number) => {
    storage.save('weeklyActiveStep', step)
    setActiveStep(step)
  }

  const resetState = () => {
    setApplication({} as any)
    saveActiveStep(0)
  }

  const handleSave = async () => {
    if(application){
      const applicationId = await save(application)
      handleChange({ ...application, applicationId })
      localSave({...application, applicationId })
      snackbar.showFeedback({ message: 'Progress Saved' })
    }
  }

  const handleSubmit = async () => {
    try {
      //TODO: Show Progress

      await submit(application)
      navigate('confirm',  { state: { applicationId: application.applicationId }})
    } catch (e) {
      //TODO: Show submit error
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = async () => {
    let isStepValid: boolean = true

    if (isStepValid) {
      try {
        await handleSave()
        if (activeStep === steps.length - 1) {
          //Submit App
          handleSubmit()
        } else {
          saveActiveStep(activeStep + 1)
        }
      }
      catch(e) {
        console.error(e)
      }
    }
  }

  const handleChange = (weeklyApplication: weeklyQuestions) => {
    localSave({...weeklyApplication})
    setApplication({...weeklyApplication}) // debounce to fix lag
  }

  const handleWorkSearchChange = (applicant: weeklyQuestions) => {
    localSave({...applicant, workSearchRecords: applicant.workSearchRecords})
    setApplication({...applicant, workSearchRecords: applicant.workSearchRecords})
  }

  const save = async (application: Partial<weeklyQuestions>): Promise<string> => {
    return api.saveApplication(application).then((result: any) => {
      setApplication((application: any) => ({
        ...application,
        applicationId: result.applicationId
      } as any))
      return result
    })
    .catch(console.error)
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
    handleWorkSearchChange,
    load,
    save,
    submit,
    handleBack,
    handleNext,
    isDisabled: disabled,
    handleSave,
    activeStep,
    setActiveStep: saveActiveStep,
    localSave
  }
}
