import { Button, Grid, MobileStepper, Paper, Step, StepContent, StepLabel, Stepper, Theme, Typography, createStyles, makeStyles } from "@material-ui/core"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, { useEffect, useState } from "react"

import { Layout } from "../components/layout"
import SectionA from "../components/sectionA/sectionA"
import SectionB from "../components/sectionB/sectionB"
import SectionC from "../components/sectionC/sectionC"
import SectionD from "../components/sectionD/sectionD"
import SectionE from "../components/sectionE/sectionE"
import SectionF from "../components/sectionF/sectionF"
import { SEO } from "../components/seo"
import useApplication from "../hooks/useApplication"
import useSectionA from "../hooks/useSectionA"
import useSectionB from "../hooks/useSectionB"
import ApplicationModel from "../models/Application"
import theme from "../themes/theme-light"
import useApplicantFormApi from "../hooks/useApplicantFormApi"
import { navigate } from "gatsby"

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

interface ApplicationProps {
  application?: ApplicationModel
  isDisabled?: boolean
}

export const Application = (props: ApplicationProps) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const disabled = !!props.isDisabled
  console.log(props.application)
  const {
    saveSectionA,
    saveSectionB
  } = useApplication(props.application)

  const {
    handleSubmit: handleSectionASubmit,
    handleChange: handleSectionAChange,
    currentValue: sectionACurrentValue } = useSectionA(props.application)

  const {
    handleSubmit: handleSectionBSubmit,
    handleChange: handleSectionBChange,
    currentValue: sectionBCurrentValue } = useSectionB(props.application)

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleNext = () => {
    let isStepValid: boolean = true
    switch (activeStep) {
      case 0:
        const { applicant, hasErrors: sectionAHasErrors } = handleSectionASubmit()
        saveSectionA(applicant)
        isStepValid = !sectionAHasErrors
        break
      case 1:
        const { employmentRecords, hasErrors: sectionBHasErrors } = handleSectionBSubmit()
        saveSectionB(employmentRecords)
        isStepValid = !sectionBHasErrors
        break
    }
    isStepValid && setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const steps = [
    {
      key: 'A',
      icon: pageInfo.sectionA.icon,
      title: pageInfo.sectionA.title,
      currentValue: sectionACurrentValue,
      isFirstStep: true,
      onChange: handleSectionAChange,
      component: SectionA
    },
    {
      key: 'B',
      icon: pageInfo.sectionB.icon,
      title: pageInfo.sectionB.title,
      currentValue: sectionBCurrentValue,
      isFirstStep: false,
      onChange: handleSectionBChange,
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
      title: pageInfo.sectionF.title,
      isFirstStep: false,
      component: SectionF
    },
  ]

  const ActiveSection = steps?.[activeStep]?.component

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
                  onClick={() => setActiveStep(index)}
                >
                  {step.title}
                </StepLabel>
                <StepContent>
                  <Grid container direction={'column'} spacing={2}>
                    <Grid item>
                      <Section isDisabled={disabled} value={step.currentValue} onChange={step?.onChange} />
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
                <ActiveSection isDisabled={disabled} value={steps[activeStep].currentValue} onChange={steps[activeStep]?.onChange} />
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
                <Button disabled={disabled} size="medium" onClick={handleBack} disabled={activeStep === 0}>
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

const ApplicationPage = (props: any) => {
  const api = useApplicantFormApi()
  const [application, setApplication] = useState<ApplicationModel>()

  useEffect(() => {
    const retrieveApplication = async (applicationId: string) => {
      const application = await api.getApplication(applicationId)
      setApplication(application)
    }

    const { applicationId } = props.location?.state

    if (applicationId) {
      retrieveApplication(applicationId)
    } else {
      const uid = localStorage.getItem('uid')
      if (uid) {
        setApplication({ userId: uid } as ApplicationModel)
      } else {
        navigate('/')
      }
    }
  }, [])

  return (
    <Layout>
      <SEO />
      <Application application={application} />
    </Layout>
  )
}

export default ApplicationPage
