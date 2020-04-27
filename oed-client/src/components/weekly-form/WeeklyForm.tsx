import {
  Button,
  Grid,
  MobileStepper,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  createStyles,
  makeStyles
} from "@material-ui/core"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, { useEffect, useState } from 'react'

import useApplication from "../../hooks/useApplication"
import useSectionA from "../../hooks/useSectionA"
import useSectionB from "../../hooks/useSectionB"
import useWeeklyFormApi from '../../hooks/useWeeklyFormApi'
import ApplicationModel from '../../models/Application'
import theme from "../../themes/theme-light"
import SectionA from "../sectionA/sectionA"
import SectionB from "../sectionB/sectionB"

const pageInfo = {
  title: 'Initial Application for Pandemic Unemployment Assistance',
  sectionA: {
    icon: 'A',
    title: 'APPLICANT INFORMATION',
  },
  sectionB: {
    icon: 'B',
    title: 'APPLICANT EMPLOYMENT',
  },
  back: 'Back',
  next: 'Next',
  submit: 'Submit',
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appStepper: {
      padding: theme.spacing(1),
    }
  }),
)

//#region Step Action Buttons
interface StepActionsProp {
  isFirstStep?: boolean
  isLastStep?: boolean
  onBack: () => void
  onNext: () => void
  isDisabled?: boolean
}
const StepActions = (props: StepActionsProp) => {
  const disabledBack = !!props.isDisabled || props.isFirstStep || false
  const showSubmit = props.isLastStep || false
  return (
    <Grid container direction={'row'} justify={'flex-end'} alignItems={'center'} spacing={2}>
      <Grid item>
        <Button
          disabled={disabledBack}
          onClick={props.onBack}
        >
          {pageInfo.back}
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={!!props.isDisabled}
          variant="contained"
          color="primary"
          onClick={props.onNext}
        >
          {
            (showSubmit) ? pageInfo.submit : pageInfo.next
          }
        </Button>
      </Grid>
    </Grid>
  )
}

interface WeeklyFormProps {
  applicationId?: string
  onSubmit?: () => void
  isDisabled?: boolean
}

export default function WeeklyForm(props: WeeklyFormProps) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { applicationId, isDisabled } = props
  const disabled = !!isDisabled
  const api = useWeeklyFormApi()
  const [application, setApplication] = useState<ApplicationModel>()

  useEffect(() => {
    //TODO: Check Application in Progress (check storage) ask Continue or discard?
    const retrieveApplication = async (applicationId: string) => {
      const application = await api.getApplication(applicationId) // TODO: create new method to get weeklyForm app
      setApplication(application)
    }

    const createApplication = async () => {
      const app = {userId: localStorage.uid}
      const applicationId = await api.saveApplication(app) // TODO: create a new method to save weeklyForm app
      setApplication({...app, id: applicationId })
    }

    if (applicationId) {
      retrieveApplication(applicationId)
    } else {
      createApplication()
    }
  }, [applicationId])

  const { save, localSave } = useApplication()
  const { handleSubmit: handleSectionASubmit } = useSectionA()
  const { handleSubmit: handleSectionBSubmit } = useSectionB()

  const handleChange = (app: ApplicationModel) => {
    localSave(app)
    setApplication(app)
  }

  const handleSave = async () => {
    if(application){
      const applicationId = await save(application);
      setApplication({ ...application, id: applicationId })
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
    let isStepValid: boolean = true
    switch (activeStep) {
      case 0:
        const { hasErrors: sectionAHasErrors } = handleSectionASubmit()
        isStepValid = !sectionAHasErrors
        break
      case 1:
        const { hasErrors: sectionBHasErrors } = handleSectionBSubmit()
        isStepValid = !sectionBHasErrors
        break
    }

    if (isStepValid) {
      handleSave()
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const steps = [
    {
      key: 'A',
      icon: pageInfo.sectionA.icon,
      title: pageInfo.sectionA.title,
      isFirstStep: true,
      component: SectionA
    },
    {
      key: 'B',
      icon: pageInfo.sectionB.icon,
      title: pageInfo.sectionB.title,
      isFirstStep: false,
      component: SectionB
    },
  ]

  const ActiveSection = steps?.[activeStep]?.component

  if (application) {
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2em'
        }}>
          <Typography variant={'h5'}>
            {pageInfo.title}
          </Typography>
        </Grid>
        <Grid item >
          <Stepper activeStep={activeStep} orientation="vertical" className={classes.appStepper}>
            {!isMobile && steps.map(((step, index) => {
              const Section = step.component
              return (
                <Step key={step.key}>
                  <StepLabel
                    style={{ cursor: 'pointer' }}
                    StepIconProps={{ icon: step.icon }}
                    onClick={() => {
                      setActiveStep(index)
                      handleSave()
                    }}
                  >
                    {step.title}
                  </StepLabel>
                  <StepContent>
                    <Grid container direction={'column'} spacing={2}>
                      <Grid item>
                        <Section applicationId={applicationId} isDisabled={disabled} application={application} onChange={handleChange} />
                      </Grid>
                      <Grid item>
                        <StepActions isDisabled={disabled} isFirstStep={!!step.isFirstStep} onBack={handleBack} onNext={handleNext} />
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
              )
            }))}
          </Stepper>

          {isMobile &&
            <div>
              <Paper square elevation={0}>
                <Typography>{steps[activeStep].title}</Typography>
              </Paper>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <ActiveSection applicationId={applicationId} isDisabled={disabled} application={application} onChange={handleChange} />
                </Grid>
              </Grid>
              <MobileStepper
                steps={steps.length}
                position="bottom"
                variant="text"
                activeStep={activeStep}
                nextButton={
                  <Button disabled={disabled} size="medium" variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? pageInfo.submit : pageInfo.next}
                  </Button>
                }
                backButton={
                  <Button disabled={disabled || activeStep === 0} size="medium" onClick={handleBack} >
                    Back
                </Button>
                }
              />
            </div>
          }
        </Grid>
      </Grid>
    )
  }

  return (<div>Loading...</div>)
}
