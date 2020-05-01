import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import SectionB from "../sectionB/sectionB"
import weeklyQuestions from "../../models/weeklyQuestions"
import ApplicationModel from '../../models/Application'
import useWeeklyApplication from "../../hooks/useWeeklyApplication"

const defaultValue: weeklyQuestions = {
  ableToWork: false,
  awayFromResidence: false,
  seekedEmployment: true,
  veteran: false,
  temporaryUnemployment: false,
  firstName: '',
  middleName: '',
  lastName: '',
  ssn: '',
  dob: undefined,
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: ''
  },
  phone: '',
  email: '',
  gender: undefined,
  isHispanicLatino: undefined,
  contactMethod: undefined,
  races: [],
  adminNote: ''
}

interface WeeklyStep2Props {
  weekly?: weeklyQuestions,
  onChangeWeekly: (weeklyQuestions: weeklyQuestions) => void
  isDisabled?: boolean,
  //todo fix
  onChange: (application: ApplicationModel) => void,
  application: ApplicationModel,
}

export default (props: WeeklyStep2Props) => {
  const [state, setState] = useState(props.weekly || defaultValue)

  const {handleEmploymentChange} = useWeeklyApplication()

  const { isDisabled } = props
  const disabled = !!isDisabled

  const handleBooleanSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    setState({ ...state, [name]: checked && value === 'true' })
  }


  useEffect(() => {
    //todo fix
    props.onChangeWeekly(state)
  }, [state])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7} md={12}>
        <SectionB application={props.application} onChange={handleEmploymentChange}/>
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Are you disabled or a veteran?</FormLabel>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={state.veteran === true} onChange={handleBooleanSelection} name="veteran" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={state.veteran === false} onChange={handleBooleanSelection} name="veteran" value={false} disabled={disabled} />}
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
              control={<Radio checked={state.temporaryUnemployment === true} onChange={handleBooleanSelection} name="temporaryUnemployment" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={state.temporaryUnemployment === false} onChange={handleBooleanSelection} name="temporaryUnemployment" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

    </Grid>
  )
}
