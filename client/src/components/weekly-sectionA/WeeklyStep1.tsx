import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import weeklyQuestions from "../../models/weeklyQuestions"

const defaultValue: weeklyQuestions = {
  ableToWork: false,
  awayFromResidence: false,
  seekedEmployment: true,
  veteran: false,
  temporaryUnemployment: false,
}

interface WeeklyStep1Props {
  weekly?: weeklyQuestions,
  onChange: (weeklyQuestions: weeklyQuestions) => void,
  isDisabled?: boolean
}

export default (props: WeeklyStep1Props) => {
  const [state, setState] = useState(props.weekly || defaultValue)

  const { isDisabled } = props
  const disabled = !!isDisabled

  const handleBooleanSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    setState({ ...state, [name]: checked && value === 'true' })
  }


  useEffect(() => {
    props.onChange(state)
  }, [state])

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Were you physically able and willing to work last week?</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={state.ableToWork === true} onChange={handleBooleanSelection} name="ableToWork" value={true} disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={state.ableToWork === false} onChange={handleBooleanSelection} name="ableToWork" value={false} disabled={disabled} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Were you away from your primary residence for more than 3 days?</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={state.awayFromResidence === true} onChange={handleBooleanSelection} name="awayFromResidence" value={true} disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={state.awayFromResidence === false} onChange={handleBooleanSelection} name="awayFromResidence" value={false} disabled={disabled} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Did you seek unemployment last week?</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={state.seekedEmployment === true} onChange={handleBooleanSelection} name="seekedEmployment" value={true} disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={state.seekedEmployment === false} onChange={handleBooleanSelection} name="seekedEmployment" value={false} disabled={disabled} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
  )
}
