import { Button, Grid, Step, StepContent, StepLabel, Stepper, Theme, Typography, createStyles, makeStyles } from "@material-ui/core"
import React, { useEffect } from "react"

import { Layout } from "../components/layout"
import SectionA from "../components/sectionA/sectionA"
import SectionB from "../components/sectionB/sectionB"
import SectionC from "../components/sectionC/sectionC"
import SectionD from "../components/sectionD/sectionD"
import SectionE from "../components/sectionE/sectionE"
import SectionF from "../components/sectionF/sectionF"
import { SEO } from "../components/seo"
import firebase from '../lib/firebase'

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

const useSignIn = () => { // fake for demo
  useEffect(() => {
    const signInAsCustomer = (): any => {
      if (!localStorage.token && typeof window !== 'undefined') {
        firebase.auth().signInWithEmailAndPassword('djones@ignw.io', 'Testing123!')
          .then(async () => {
            localStorage.setItem('token', await firebase?.auth()?.currentUser?.getIdToken().catch(console.error) || '')
          })
          .catch(console.error)
      }
    }
    signInAsCustomer()
    return () => {}
  })
}

const InitialApplicationPage = () => {
  // useSignIn() remove until I can figure out why firebase env vars are not loading
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
  <Layout>
    <SEO />
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
        <Stepper activeStep={activeStep} orientation="vertical"  className={classes.appStepper}>
          <Step key={'A'}>
            <StepLabel StepIconProps={{icon: pageInfo.sectionA.icon}}>{pageInfo.sectionA.title}</StepLabel>
            <StepContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <SectionA/>
                </Grid>
                <Grid item>
                  <StepActions isFirstStep={true} onBack={handleBack} onNext={handleNext}/>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key={'B'}>
            <StepLabel StepIconProps={{icon: pageInfo.sectionB.icon}}>{pageInfo.sectionB.title}</StepLabel>
            <StepContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <SectionB/>
                </Grid>
                <Grid item>
                  <StepActions onBack={handleBack} onNext={handleNext}/>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key={'C'}>
            <StepLabel StepIconProps={{icon: pageInfo.sectionC.icon}}>{pageInfo.sectionC.title}</StepLabel>
            <StepContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <SectionC/>
                </Grid>
                <Grid item>
                  <StepActions onBack={handleBack} onNext={handleNext}/>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key={'D'}>
            <StepLabel StepIconProps={{icon: pageInfo.sectionD.icon}}>{pageInfo.sectionD.title}</StepLabel>
            <StepContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <SectionD/>
                </Grid>
                <Grid item>
                  <StepActions onBack={handleBack} onNext={handleNext}/>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key={'E'}>
            <StepLabel StepIconProps={{icon: pageInfo.sectionE.icon}}>{pageInfo.sectionE.title}</StepLabel>
            <StepContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <SectionE/>
                </Grid>
                <Grid item>
                  <StepActions onBack={handleBack} onNext={handleNext}/>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key={'F'}>
            <StepLabel StepIconProps={{icon: pageInfo.sectionF.icon}}>{pageInfo.sectionF.title}</StepLabel>
            <StepContent>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <SectionF/>
                </Grid>
                <Grid item>
                  <StepActions isLastStep={true} onBack={handleBack} onNext={handleNext}/>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        </Stepper>
      </Grid>
    </Grid>
  </Layout>
  )
}


//#region Step Action Buttons
interface  StepActionsProp {
  isFirstStep?: boolean
  isLastStep?: boolean
  onBack: () => void
  onNext: () => void
}
const StepActions = (props: StepActionsProp) => {
  const disabledBack = props.isFirstStep || false
  const showSubmit = props.isLastStep || false
  return (
    <Grid container direction={'row'} justify={'flex-end'}  alignItems={'center'} spacing={2}>
      <Grid item>
        <Button
          disabled={disabledBack}
          onClick={props.onBack}
        >
          { pageInfo.back }
        </Button>
      </Grid>
      <Grid item>
        <Button
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
export default InitialApplicationPage
