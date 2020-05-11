import { navigate } from 'gatsby'
import { useContext, useEffect, useState } from 'react'

import { steps } from  '../components/application/application'
import Application from '../models/Application'
import ApplicationModel from '../models/Application'
import { SnackBarContext } from '../providers/SnackbarProvider'
import storage from '../util/storage'
import useApplicantFormApi from './useApplicantFormApi'
import useSectionA from './useSectionA'
import useSectionB from './useSectionB'

const loadApplication = (_?: string): ApplicationModel => {
  return {} as ApplicationModel
  //TODO: Load from Storage if not applicationId
  // TODO: Ask to user when applicationId and  storage version
  //   const storageApp = storage.load('application')
}

export default (props: { applicationId?: string, isDisabled?: boolean }) => {
  const [activeStep, setActiveStep] = useState(parseInt(storage.load('activeStep')) || 0)
  const snackbar = useContext(SnackBarContext)
  const api = useApplicantFormApi()
  const [application, setApplication] = useState<ApplicationModel>(loadApplication())
  const { applicationId, isDisabled } = props || {}
  const disabled = !!isDisabled

  useEffect(() => {
    if (applicationId) {
      load(applicationId)
    } else {
      create()
    }

    return () => {
      resetState()
    }
  }, [])

  const { handleSubmit: handleSectionASubmit } = useSectionA()
  const { handleSubmit: handleSectionBSubmit } = useSectionB()

  const saveActiveStep = (step: number) => {
    storage.save('activeStep', step)
    setActiveStep(step)
  }

  const resetState = () => {
    setApplication({} as ApplicationModel)
    saveActiveStep(0)
  }

  const handleChange = (app: ApplicationModel) => {
    setApplication(app)
  }

  const handleBack = () => {
    saveActiveStep(activeStep - 1)
  }

  const handleNext = async () => {
    let isStepValid: boolean = true
    switch (activeStep) {
      case 0: //A
        const { hasErrors: sectionAHasErrors } = handleSectionASubmit()
        isStepValid = !sectionAHasErrors
        break
      case 1: //B
        const { hasErrors: sectionBHasErrors } = handleSectionBSubmit()
        isStepValid = !sectionBHasErrors
        break
      // case 2: //C
      //   const { hasErrors: sectionCHasErrors } = handleSectionCSubmit()
      //   isStepValid = !sectionCHasErrors
      // break
      // case 4: //D
      //   const { hasErrors: sectionDHasErrors } = handleSectionDSubmit()
      //   isStepValid = !sectionDHasErrors
      // break
      // case 5: //E
      //   const { hasErrors: sectionEHasErrors } = handleSectionESubmit()
      //   isStepValid = !sectionEHasErrors
      // break
      // case 6: //F
      //   const { hasErrors: sectionFHasErrors } = handleSectionFSubmit()
      //   isStepValid = !sectionFHasErrors
      // break
      // case 6: //G
      //   const { hasErrors: sectionGHasErrors } = handleSectionGSubmit()
      //   isStepValid = !sectionGHasErrors
      // break
    }

    if (isStepValid) {
      try {
        await handleSave()
        if (activeStep === steps.length - 1) {
          //Submit App
          submit && submit(application?.id)
        } else {
          saveActiveStep(activeStep + 1)
        }
      }
      catch (e) {
      }
    }
  }

  const create = async () => {
    try {
      const userId: any = localStorage.getItem('uid')
      const { id } = await api.createApplication()
      setApplication({ ...application, id, userId } as Application)
    } catch (e) {
      snackbar.showFeedback({ message: 'Failed to create a new application', severity: 'error' })
    }
  }

  const load = async (applicationId: string) => {
    try {
      const application = await api.getApplication(applicationId)
      setApplication(application)
    } catch (e) {
      snackbar.showFeedback({ message: 'Failed to load application', severity: 'error' })
    }
  }

  const save = (application: Application) => {
    console.log(application)
    return api.updateApplication(application)
  }

  const localSave = (application:  Application) => {
    storage.save('application', application)
  }

  const handleSave = async () => {
    if (application) {
      await save(application)
      localSave(application)
      snackbar.showFeedback({ message: 'Progress Saved' })
    } else {
      snackbar.showFeedback({ message: 'Failed to save progress', severity: 'error' })
    }
  }

  const submit = async (applicationId: string) => {
    await api.submitApplication(applicationId)
    return navigate('application-submitted',  { state: { applicationId }})
  }

  const discard = async (applicationId: string) => {
    await api.discardApplication(applicationId)
  }

  return {
    load,
    submit,
    discard,
    disabled,
    handleChange,
    handleBack,
    handleNext,
    applicationId,
    isDisabled: disabled,
    application,
    activeStep,
    setActiveStep: saveActiveStep,
  }
}
