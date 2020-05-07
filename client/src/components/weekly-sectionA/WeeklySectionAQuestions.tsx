import React from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import questions from "../weekly-form/questions"
import {WeeklySectionProps} from "../../models/WeeklySectionProps"

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
