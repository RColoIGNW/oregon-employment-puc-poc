import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import HelpIcon from "@material-ui/icons/Help"
import React, { useState } from "react"

import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import questions from "../weekly-form/questions"
import HelpDialog from "../weekly-sectionC/HelpDialog"

const defaultValue = {
  failedToAcceptOffer: false,
  quitJob: false,
  firedOrSuspended: false,
  awayFromResidence: false,
  employmentHistory: [],
  applicationId: "",
}

export default (props: WeeklySectionProps) => {
  const applicant = props.application || defaultValue

  const [failedToAcceptExpanded, setFailedToAcceptExpanded] = useState(false)
  const setFailed = (open: boolean) => {
    setFailedToAcceptExpanded(open)
  }

  const [failedQuitExpanded, setQuitExpanded] = useState(false)
  const setQuit = (open: boolean) => {
    setQuitExpanded(open)
  }

  const [firedOrSuspendedExpanded, setFiredOrSuspendedExpanded] = useState(
    false
  )
  const setFired = (open: boolean) => {
    setFiredOrSuspendedExpanded(open)
  }

  const [awayFromResidenceExpanded, setAwayFromResidenceExpanded] = useState(
    false
  )
  const setAway = (open: boolean) => {
    setAwayFromResidenceExpanded(open)
  }

  const { isDisabled } = props
  const disabled = !!isDisabled

  const handleBooleanSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = event.target
    props.handleChange({ ...applicant, [name]: checked && value === "true" })
  }

  return (
    <Grid container={true} spacing={2}>
      <Grid item={true} xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {questions.failedToAcceptOffer}
          </FormLabel>
          <Grid style={{ display: "flex", paddingTop: 10 }}>
            <Button
              variant={"outlined"}
              startIcon={<HelpIcon />}
              onClick={() => setFailedToAcceptExpanded(true)}
            >
              Help
            </Button>
            {failedToAcceptExpanded && (
              <HelpDialog
                title={"Question 1"}
                textSections={questions.failedToAcceptOfferHelp}
                openFn={setFailed}
              />
            )}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.failedToAcceptOffer === true}
                  onChange={handleBooleanSelection}
                  name="failedToAcceptOffer"
                  value={true}
                  disabled={disabled}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.failedToAcceptOffer === false}
                  onChange={handleBooleanSelection}
                  name="failedToAcceptOffer"
                  value={false}
                  disabled={disabled}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item={true} xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.quitJob}</FormLabel>
          <Grid style={{ display: "flex", paddingTop: 10 }}>
            <Button
              variant={"outlined"}
              startIcon={<HelpIcon />}
              onClick={() => setQuitExpanded(true)}
            >
              Help
            </Button>
            {failedQuitExpanded && (
              <HelpDialog
                title={"Question 2"}
                textSections={questions.quitJobHelp}
                openFn={setQuit}
              />
            )}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.quitJob === true}
                  onChange={handleBooleanSelection}
                  name="quitJob"
                  value={true}
                  disabled={disabled}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.quitJob === false}
                  onChange={handleBooleanSelection}
                  name="quitJob"
                  value={false}
                  disabled={disabled}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item={true} xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.firedOrSuspended}</FormLabel>
          <Grid style={{ display: "flex", paddingTop: 10 }}>
            <Button
              variant={"outlined"}
              startIcon={<HelpIcon />}
              onClick={() => setFiredOrSuspendedExpanded(true)}
            >
              Help
            </Button>
            {firedOrSuspendedExpanded && (
              <HelpDialog
                title={"Question 3"}
                textSections={questions.firedOrSuspendedHelp}
                openFn={setFired}
              />
            )}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.firedOrSuspended === true}
                  onChange={handleBooleanSelection}
                  name="firedOrSuspended"
                  value={true}
                  disabled={disabled}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.firedOrSuspended === false}
                  onChange={handleBooleanSelection}
                  name="firedOrSuspended"
                  value={false}
                  disabled={disabled}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item={true} xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {questions.awayFromResidence}
          </FormLabel>
          <Grid style={{ display: "flex", paddingTop: 10 }}>
            <Button
              variant={"outlined"}
              startIcon={<HelpIcon />}
              onClick={() => setAwayFromResidenceExpanded(true)}
            >
              Help
            </Button>
            {awayFromResidenceExpanded && (
              <HelpDialog
                title={"Question 4"}
                textSections={questions.awayFromResidenceHelp}
                openFn={setAway}
              />
            )}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.awayFromResidence === true}
                  onChange={handleBooleanSelection}
                  name="awayFromResidence"
                  value={true}
                  disabled={disabled}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={applicant.awayFromResidence === false}
                  onChange={handleBooleanSelection}
                  name="awayFromResidence"
                  value={false}
                  disabled={disabled}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}
