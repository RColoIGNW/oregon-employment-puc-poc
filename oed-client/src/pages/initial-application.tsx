import React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { Grid, Typography, Stepper, Step, StepContent, StepLabel, Button } from "@material-ui/core";
import SectionA from "../components/sectionA/sectionA";
import SectionB from "../components/sectionB/sectionB";
import SectionC from "../components/sectionC/sectionC";
import SectionD from "../components/sectionD/sectionD";
import SectionE from "../components/sectionE/sectionE";
import SectionF from "../components/sectionF/sectionF";

const pageInfo = {
  title: 'INITIAL APPLICATION FOR PANDEMIC UNEMPLOYMENT ASSISTANCE', 
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

const InitialApplicationPage = () => {  
  const [activeStep, setActiveStep] = React.useState(0);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
  <Layout>
    <SEO />
    <Grid container direction="column" spacing={2}>
      <Grid item> 
        <Typography variant={'h5'}>
          {pageInfo.title}
        </Typography>
      </Grid>
      <Grid item >         
        <Stepper activeStep={activeStep} orientation="vertical" > 
          <Step>
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
          <Step>
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
          <Step>
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
          <Step>
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
          <Step>
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
          <Step>
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
export default InitialApplicationPage;