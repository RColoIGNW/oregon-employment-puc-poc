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

import useApplicantFormApi from '../../hooks/useApplicantFormApi'
import useApplication from "../../hooks/useApplication"
import useSectionA from "../../hooks/useSectionA"
import useSectionB from "../../hooks/useSectionB"
import ApplicationModel from '../../models/Application'
import theme from "../../themes/theme-light"
import SectionA from "../sectionA/sectionA"
import SectionB from "../sectionB/sectionB"
import SectionC from "../sectionC/sectionC"
import SectionD from "../sectionD/sectionD"
import SectionE from "../sectionE/sectionE"
import SectionF from "../sectionF/sectionF"
import SectionG from "../sectionG/sectionG"

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
  sectionC: {
    icon: 'C',
    title: 'ELIGIBILITY QUESTIONS',
  },
  sectionD: {
    icon: 'D',
    title: 'SELF-EMPLOYMENT INFORMATION',
  },
  sectionE: {
    icon: 'E',
    title: 'AUTHORIZATION FOR TAX WITHHOLDING',
  },
  sectionF: {
    icon: 'F',
    title: 'APPLICANT CERTIFICATION',
  },
  sectionG: {
    icon: 'G',
    title: 'ADDITIONAL DOCUMENTS (OPTIONAL)',
  },
  back: 'Back',
  next: 'Next',
  submit: 'Submit Application',
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

interface ApplicationProps {
  applicationId?: string
  onSubmit?: (application: ApplicationModel) => void
  isDisabled?: boolean
}

export const Application = (props: ApplicationProps) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { applicationId, isDisabled } = props
  const disabled = !!isDisabled
  const api = useApplicantFormApi()
  const [application, setApplication] = useState<ApplicationModel>()

  useEffect(() => {
    //TODO: Check Application in Progress (check storage) ask Continue or discard?
    const retrieveApplication = async (applicationId: string) => {
      const application = await api.getApplication(applicationId)
      setApplication(application)
    }

    const createApplication = async () => {
      const app = {userId: localStorage.uid}
      const applicationId = await api.saveApplication(app);
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
    {
      key: 'C',
      icon: pageInfo.sectionC.icon,
      title: pageInfo.sectionC.title,
      isFirstStep: false,
      component: SectionC
    },
    {
      key: 'D',
      icon: pageInfo.sectionD.icon,
      title: pageInfo.sectionD.title,
      isFirstStep: false,
      component: SectionD
    },
    {
      key: 'E',
      icon: pageInfo.sectionE.icon,
      title: pageInfo.sectionE.title,
      isFirstStep: false,
      component: SectionE
    },    
    {
      key: 'F',
      icon: pageInfo.sectionF.icon,
      title: pageInfo.sectionG.title,
      isFirstStep: false,
      component: SectionG
    },
    {
      key: 'G',
      icon: pageInfo.sectionG.icon,
      title: pageInfo.sectionF.title,
      isFirstStep: false,
      component: SectionF
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
