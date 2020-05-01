import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import SectionB from "../sectionB/sectionB"
import weeklyQuestions from "../../models/weeklyQuestions"
import ApplicationModel from '../../models/Application'

const defaultValue = {
  ableToWork: true,
  awayFromResidence: false,
  seekedEmployment: true,
  veteran: false,
  temporaryUnemployment: false,
  employmentHistory: [],
  applicationId: ''
}

interface WeeklyFormProps {
  applicationId?: string,
  applicant?: weeklyQuestions,
  isDisabled?: boolean,
  onChange: (application: weeklyQuestions) => void,
  handleEmploymentChange: (employmentRecords: ApplicationModel) => void,
}

export default (props: WeeklyFormProps) => {
  const applicant = props.applicant || defaultValue

  const { isDisabled } = props
  const disabled = !!isDisabled

  const handleBooleanSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    props.onChange({ ...applicant, [name]: checked && value === 'true' })
  }

  const fakeApplication = {
    id: '',
    userId: '',
    isCertified: false,
    certifiedBy: ''
  }

  useEffect(() => {
    props.onChange(applicant)
  }, [applicant])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7} md={12}>
        <SectionB application={fakeApplication} onChange={props.handleEmploymentChange}/>
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Are you disabled or a veteran?</FormLabel>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.veteran === true} onChange={handleBooleanSelection} name="veteran" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.veteran === false} onChange={handleBooleanSelection} name="veteran" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Are you temporarily unemployed and planning to return to your employer?</FormLabel>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.temporaryUnemployment === true} onChange={handleBooleanSelection} name="temporaryUnemployment" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.temporaryUnemployment === false} onChange={handleBooleanSelection} name="temporaryUnemployment" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

    </Grid>
  )
}
