import React from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import questions from "../weekly-form/questions"
import { WeeklySectionProps } from "../../models/WeeklySectionProps"

const defaultValue = {
  ableToWork: true,
  awayFromResidence: false,
  employmentHistory: [],
  applicationId: ''
}

export default (props: WeeklySectionProps) => {
  const applicant = props.applicant || defaultValue

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
          <FormLabel component="legend">{questions.awayFromResidence}</FormLabel>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.awayFromResidence === true} onChange={handleBooleanSelection} name="awayFromResidence" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.awayFromResidence === false} onChange={handleBooleanSelection} name="awayFromResidence" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.ableToWork}</FormLabel>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.ableToWork === true} onChange={handleBooleanSelection} name="ableToWork" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.ableToWork === false} onChange={handleBooleanSelection} name="ableToWork" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>

    </Grid>
    </Grid>
  )
}
