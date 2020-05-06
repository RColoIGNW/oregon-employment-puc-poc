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
import React from "react"

import ApplicationModel from '../../models/Application'
import weeklyQuestions from "../../models/weeklyQuestions"
import theme from "../../themes/theme-light"
import WeeklyStep1 from "../weekly-sectionA/WeeklyStep1"
import WeeklyStep2 from "../weekly-sectionB/WeeklyStep2"
import WeeklyStep3 from "../weekly-sectionC/WeekleStep3"
import { WeeklySectionProps } from "../../models/WeeklySectionProps"

export const pageInfo = {
  title: 'Initial Application for Pandemic Unemployment Assistance',
  sectionA: {
    icon: 'A',
    title: 'APPLICANT INFORMATION Part 1',
  },
  sectionB: {
    icon: 'B',
    title: 'APPLICANT INFORMATION Part 2',
  },
  sectionC: {
    icon: 'C',
    title: 'APPLICANT EMPLOYMENT',
  },
  back: 'Back',
  next: 'Next',
  submit: 'Submit',
}

export const steps = [
  {
    key: 'A',
    icon: pageInfo.sectionA.icon,
    title: pageInfo.sectionA.title,
    isFirstStep: true,
    component: WeeklyStep1
  },
  {
    key: 'B',
    icon: pageInfo.sectionB.icon,
    title: pageInfo.sectionB.title,
    isFirstStep: false,
    component: WeeklyStep2
  },
  {
    key: 'C',
    icon: pageInfo.sectionB.icon,
    title: pageInfo.sectionB.title,
    isFirstStep: false,
    component: WeeklyStep3
  },
]

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

export default function WeeklyForm(props: WeeklySectionProps) {
  const classes = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    application,
    isDisabled: disabled,
    activeStep,
    setActiveStep,
    handleSave,
    handleChange,
    handleEmploymentChange,
    handleBack,
    handleNext,
  } = props

  const ActiveSection = steps?.[activeStep]?.component

  if (props.application) {
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
                        <Section handleChange={handleChange} handleEmploymentChange={handleEmploymentChange} applicant={application} />
                      </Grid>
                      <Grid item>
                        <StepActions isDisabled={disabled} isFirstStep={!!step.isFirstStep} onBack={handleBack} onNext={handleNext} isLastStep={activeStep === steps.length - 1}/>
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
                  <ActiveSection handleChange={handleChange} handleEmploymentChange={handleEmploymentChange} applicant={application} />
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
