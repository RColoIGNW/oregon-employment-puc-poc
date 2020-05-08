import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import questions from "../weekly-form/questions"
import {WeeklySectionProps} from "../../models/WeeklySectionProps"
import Button from "@material-ui/core/Button"
import HelpIcon from "@material-ui/icons/Help"
import HelpDialog from "../weekly-sectionC/HelpDialog"

const defaultValue = {
  failedToAcceptOffer: false,
  quitJob: false,
  firedOrSuspended: false,
  veteran: false,
  temporaryUnemployment: false,
  employmentHistory: [],
  applicationId: ''
}

export default (props: WeeklySectionProps) => {
  const applicant = props.application || defaultValue

  const [failedToAcceptExpanded, setFailedToAcceptExpanded] = useState(false)
  const setFailed = (open: boolean) => {setFailedToAcceptExpanded(open)}

  const [failedQuitExpanded, setQuitExpanded] = useState(false)
  const setQuit = (open: boolean) => {setQuitExpanded(open)}

  const [firedOrSuspendedExpanded, setFiredOrSuspendedExpanded] = useState(false)
  const setFired = (open: boolean) => {setFiredOrSuspendedExpanded(open)}


  const { isDisabled } = props
  const disabled = !!isDisabled

  const handleBooleanSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    props.handleChange({ ...applicant, [name]: checked && value === 'true' })
  }

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{questions.failedToAcceptOffer}</FormLabel>
            <Grid style={{display: 'flex', paddingTop: 10}}>
              <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setFailedToAcceptExpanded(true)}>Help</Button>
              {failedToAcceptExpanded && <HelpDialog title={'Question 1'} textSections={questions.failedToAcceptOfferHelp} openFn={setFailed}/>}
            </Grid>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={applicant.failedToAcceptOffer === true} onChange={handleBooleanSelection} name="failedToAcceptOffer" value={true} disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={applicant.failedToAcceptOffer === false} onChange={handleBooleanSelection} name="failedToAcceptOffer" value={false} disabled={disabled} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{questions.quitJob}</FormLabel>
            <Grid style={{display: 'flex', paddingTop: 10}}>
              <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setQuitExpanded(true)}>Help</Button>
              {failedQuitExpanded && <HelpDialog title={'Question 2'} textSections={questions.quitJobHelp} openFn={setQuit}/>}
            </Grid>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={applicant.quitJob === true} onChange={handleBooleanSelection} name="quitJob" value={true} disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={applicant.quitJob === false} onChange={handleBooleanSelection} name="quitJob" value={false} disabled={disabled} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{questions.firedOrSuspended}</FormLabel>
            <Grid style={{display: 'flex', paddingTop: 10}}>
              <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setFiredOrSuspendedExpanded(true)}>Help</Button>
              {firedOrSuspendedExpanded && <HelpDialog title={'Question 3'} textSections={questions.firedOrSuspendedHelp} openFn={setFired}/>}
            </Grid>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={applicant.firedOrSuspended === true} onChange={handleBooleanSelection} name="firedOrSuspended" value={true} disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={applicant.firedOrSuspended === false} onChange={handleBooleanSelection} name="firedOrSuspended" value={false} disabled={disabled} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
  )
}
