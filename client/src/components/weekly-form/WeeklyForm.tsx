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
  makeStyles,
} from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React from "react"

import { WeeklyFormProps } from "../../models/WeeklySectionProps"
import theme from "../../themes/theme-light"
import WeeklySectionAQuestions from "../weekly-sectionA/WeeklySectionAQuestions"
import WeeklySectionBQuestions from "../weekly-sectionB/WeeklySectionBQuestions"
import WeeklySectionC from "../weekly-sectionC/WeeklySectionC"
import WeeklySectionDVerifyResponses from "../weekly-sectionD/WeeklySectionDVerifyResponses"

export const pageInfo = {
  title: "Initial Application for Pandemic Unemployment Assistance",
  sectionA: {
    icon: "A",
    title: "APPLICANT INFORMATION Part 1",
  },
  sectionB: {
    icon: "B",
    title: "APPLICANT INFORMATION Part 2",
  },
  sectionC: {
    icon: "C",
    title: "WORK SEARCH ACTIVITY",
  },
  sectionD: {
    icon: "D",
    title: "VERIFY YOUR RESPONSES",
  },
  back: "Back",
  next: "Next",
  submit: "Submit",
}

export const steps = [
  {
    key: "A",
    icon: pageInfo.sectionA.icon,
    title: pageInfo.sectionA.title,
    isFirstStep: true,
    component: WeeklySectionAQuestions,
  },
  {
    key: "B",
    icon: pageInfo.sectionB.icon,
    title: pageInfo.sectionB.title,
    isFirstStep: false,
    component: WeeklySectionBQuestions,
  },
  {
    key: "C",
    icon: pageInfo.sectionC.icon,
    title: pageInfo.sectionC.title,
    isFirstStep: false,
    component: WeeklySectionC,
  },
  {
    key: "D",
    icon: pageInfo.sectionD.icon,
    title: pageInfo.sectionD.title,
    isFirstStep: false,
    component: WeeklySectionDVerifyResponses,
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appStepper: {
      padding: theme.spacing(1),
    },
  })
)

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
    <Grid
      container={true}
      direction={"row"}
      justify={"flex-end"}
      alignItems={"center"}
      spacing={2}
    >
      <Grid item={true}>
        <Button disabled={disabledBack} onClick={props.onBack}>
          {pageInfo.back}
        </Button>
      </Grid>
      <Grid item={true}>
        <Button
          disabled={!!props.isDisabled}
          variant="contained"
          color="primary"
          onClick={props.onNext}
        >
          {showSubmit ? pageInfo.submit : pageInfo.next}
        </Button>
      </Grid>
    </Grid>
  )
}

export default function WeeklyForm(props: WeeklyFormProps) {
  const classes = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const {
    application,
    isDisabled: disabled,
    activeStep,
    setActiveStep,
    handleSave,
    handleChange,
    handleWorkSearchChange,
    handleBack,
    handleNext,
  } = props

  const ActiveSection = steps?.[activeStep]?.component

  if (application) {
    return (
      <Grid container={true} direction="column" spacing={2}>
        <Grid
          item={true}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          <Typography variant={"h5"}>{pageInfo.title}</Typography>
        </Grid>
        <Grid item={true}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={classes.appStepper}
          >
            {!isMobile &&
              steps.map((step, index) => {
                const Section = step.component
                return (
                  <Step key={step.key}>
                    <StepLabel
                      style={{ cursor: "pointer" }}
                      StepIconProps={{ icon: step.icon }}
                      onClick={() => {
                        setActiveStep(index)
                        handleSave()
                      }}
                    >
                      {step.title}
                    </StepLabel>
                    <StepContent>
                      <Grid container={true} direction={"column"} spacing={2}>
                        <Grid item={true}>
                          <Section
                            handleChange={handleChange}
                            handleWorkSearchChange={handleWorkSearchChange}
                            application={application}
                          />
                        </Grid>
                        <Grid item={true}>
                          <StepActions
                            isDisabled={disabled}
                            isFirstStep={!!step.isFirstStep}
                            onBack={handleBack}
                            onNext={handleNext}
                            isLastStep={activeStep === steps.length - 1}
                          />
                        </Grid>
                      </Grid>
                    </StepContent>
                  </Step>
                )
              })}
          </Stepper>

          {isMobile && (
            <div>
              <Paper square={true} elevation={0}>
                <Typography>{steps[activeStep].title}</Typography>
              </Paper>
              <Grid container={true} direction={"column"} spacing={2}>
                <Grid item={true}>
                  <ActiveSection
                    handleChange={handleChange}
                    handleWorkSearchChange={handleWorkSearchChange}
                    application={application}
                  />
                </Grid>
              </Grid>
              <MobileStepper
                steps={steps.length}
                position="bottom"
                variant="text"
                activeStep={activeStep}
                nextButton={
                  <Button
                    disabled={disabled}
                    size="medium"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1
                      ? pageInfo.submit
                      : pageInfo.next}
                  </Button>
                }
                backButton={
                  <Button
                    disabled={disabled || activeStep === 0}
                    size="medium"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                }
              />
            </div>
          )}
        </Grid>
      </Grid>
    )
  }

  return <div>Loading...</div>
}
