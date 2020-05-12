import {
  Button,
  Grid,
  MobileStepper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  createStyles,
  makeStyles
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React from 'react'

import useApplication from '../../hooks/useApplication'
import theme from '../../themes/theme-light'
import SectionA from '../sectionA/sectionA'
import SectionB from '../sectionB/sectionB'
import SectionC from '../sectionC/sectionC'
import SectionD from '../sectionD/sectionD'
import SectionE from '../sectionE/sectionE'
import SectionF from '../sectionF/sectionF'
import SectionG from '../sectionG/sectionG'

export const pageInfo = {
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

export const steps = [
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
    isLastStep: true,
    component: SectionF
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appStepper: {
      padding: theme.spacing(1),
    },
    stepContainer: {
      marginBottom: 52
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
          data-testid={'back-button'}
        >
          {pageInfo.back}
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={!!props.isDisabled}
          variant='contained'
          color='primary'
          onClick={props.onNext}
          data-testid={'next-button'}
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
  onSubmit?: (applicationId: string) => void
  isDisabled?: boolean
}

export const Application = (props: ApplicationProps) => {
  const classes = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    isDisabled: disabled,
    application,
    activeStep,
    setActiveStep,
    handleBack,
    handleNext,
    handleChange,
  } = useApplication(props)

  const ActiveSection = steps?.[activeStep]?.component

  // if (!application) return (<>Loading...</>)

  return (
    <Grid container direction='column' spacing={2}>
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
        <Stepper activeStep={activeStep} orientation='vertical' className={classes.appStepper}>
          {!isMobile && steps.map(((step, index) => {
            const Section = step.component
            return (
              <Step key={step.key}>
                <StepLabel
                  style={{ cursor: 'pointer' }}
                  StepIconProps={{ icon: step.icon }}
                  onClick={() => {
                    setActiveStep(index)
                  }}
                >
                  {step.title}
                </StepLabel>
                <StepContent>
                  <Grid container direction={'column'} spacing={2}>
                    <Grid item>
                      <Section application={application} onChange={handleChange} isDisabled={disabled} />
                    </Grid>
                    <Grid item>
                      <StepActions
                        onBack={handleBack}
                        onNext={handleNext}
                        isFirstStep={!!step.isFirstStep}
                        isDisabled={disabled}
                        isLastStep={activeStep === steps.length - 1}
                      />
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>
            )
          }))}
        </Stepper>

        {isMobile &&
          <div className={classes.stepContainer}>
            <Grid container direction={'column'} spacing={2}>
              <Grid item>
                <Typography>{steps[activeStep].title}</Typography>
              </Grid>
              <Grid item>
                <ActiveSection
                  application={application}
                  onChange={handleChange}
                  isDisabled={disabled}
                />
              </Grid>
            </Grid>
            <MobileStepper
              steps={steps.length}
              position='bottom'
              variant='text'
              activeStep={activeStep}
              backButton={
                <Button
                  disabled={disabled || activeStep === 0}
                  size='medium'
                  onClick={handleBack}
                  data-testid={'back-button'}
                >
                  Back
                </Button>
              }
              nextButton={
                <Button
                  disabled={disabled}
                  size='medium'
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  data-testid={'next-button'}
                >
                  {activeStep === steps.length - 1 ? pageInfo.submit : pageInfo.next}
                </Button>
              }
            />
          </div>
        }
      </Grid>
    </Grid>
  )
}

export default Application
