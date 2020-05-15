import {
  Button,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
)

// TODO: TRANSLATION
const text = {
  back: "Back",
  next: "Next",
}
interface WizardSpepProps {
  title: string
  showBack?: boolean
  disableBack?: boolean
  onBack: () => void
  showNext?: boolean
  disableNext?: boolean
  onNext: () => void
}
const WizardStep = (props: React.PropsWithChildren<WizardSpepProps>) => {
  const classes = useStyles()

  const showBack = props.showBack || true
  const disableBack = props.disableBack || false
  const handleBack = () => {
    props.onBack && props.onBack()
  }

  const showNext = props.showNext || true
  const disableNext = props.disableNext || false
  const handleNext = () => {
    props.onNext && props.onNext()
  }

  return (
    <Step>
      <StepLabel>
        <Typography>{props.title}</Typography>
      </StepLabel>
      <StepContent>
        AAA
        <Grid container={true} direction={"column"} spacing={2}>
          <Grid item={true}>{props.children}</Grid>
          <Grid item={true}>
            {showBack && (
              <Button
                disabled={disableBack}
                onClick={handleBack}
                className={classes.button}
              >
                {text.back}
              </Button>
            )}
            {showNext && (
              <Button
                variant="contained"
                color="primary"
                disabled={disableNext}
                onClick={handleNext}
                className={classes.button}
              >
                {text.next}
              </Button>
            )}
          </Grid>
        </Grid>
      </StepContent>
    </Step>
  )
}

export default WizardStep
