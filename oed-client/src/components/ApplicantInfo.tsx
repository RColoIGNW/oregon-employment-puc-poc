import MomentUtils from '@date-io/moment';
import { Grid, Radio, RadioGroup } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import React, { useEffect, useState } from 'react'

import Address from '../models/Address'
import Applicant from '../models/Applicant'
import { ContactMethod } from '../models/ContactMethod'
import { Gender } from '../models/Gender'
import { Race, Races } from '../models/Race'
import AddressEdit from './AddressEdit'

const defaultValue: Applicant = {
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
  isSubmitted: false
}

interface ApplicantInfoProps {
  applicant?: Applicant,
  onChange: (applicant: Applicant) => void
  isDisabled?: boolean
}

export default (props: ApplicantInfoProps) => {
  const [state, setState] = useState(props.applicant || defaultValue)
  const disabled = !!props.isDisabled

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    setState({ ...state, [name]: checked && value })
  }

  const handleBooleanSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    setState({ ...state, [name]: checked && value === 'true' })
  }

  const handleDOBChange = (value: MaterialUiPickersDate) => {
    value && setState({ ...state, dob: value.toDate() })
  }

  const handleAddressChange = (address: Address) => {
    setState({...state, address: address})
  }

  const handleRaceSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    const current = state.races
    checked
      ? current.push(value as Race)
      : current.splice(current.findIndex(r => r === value), 1)
    setState({ ...state, races: current })
  }

  useEffect(() => {
    props.onChange(state)
  }, [state])

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField name="firstName" value={state.firstName} onChange={handleChange} fullWidth label="First Name" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="middleName" value={state.middleName} onChange={handleChange} fullWidth label="Middle Name" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="lastName" value={state.lastName} onChange={handleChange} fullWidth label="Last Name" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="ssn" value={state.ssn} onChange={handleChange} fullWidth label="SSN" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <KeyboardDatePicker name="dob" value={state.dob} onChange={handleDOBChange} fullWidth format="MM/DD/YYYY" inputVariant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressEdit isDisabled={disabled} address={state.address} onCompletion={handleAddressChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="phone" value={state.phone} onChange={handleChange} fullWidth label="Phone Number" variant="outlined" type="phone" disabled={disabled} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" value={state.email} onChange={handleChange} fullWidth label="Email Address" variant="outlined" type="email" disabled={disabled} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Preferred Method of Contact</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={state.contactMethod === ContactMethod.Phone} onChange={handleSelection} name="contactMethod" value={ContactMethod.Phone} disabled={disabled} />}
                label={ContactMethod.Phone}
              />
              <FormControlLabel
                control={<Radio checked={state.contactMethod === ContactMethod.Email} onChange={handleSelection} name="contactMethod" value={ContactMethod.Email} disabled={disabled} />}
                label={ContactMethod.Email}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={state.gender === Gender.Male} onChange={handleSelection} name="gender" value={Gender.Male} disabled={disabled} />}
                label={Gender.Male}
              />
              <FormControlLabel
                control={<Radio checked={state.gender === Gender.Female} onChange={handleSelection} name="gender" value={Gender.Female} disabled={disabled} />}
                label={Gender.Female}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Are you of Hispanic or Latino ethnicity?</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={state.isHispanicLatino === true} onChange={handleBooleanSelection} name="isHispanicLatino" value={true} disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={state.isHispanicLatino === false} onChange={handleBooleanSelection} name="isHispanicLatino" value={false} disabled={disabled} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Race (Check all that apply)</FormLabel>
            <FormGroup>
              {
                Races.map(race => (
                  <FormControlLabel key={race}
                    control={<Checkbox checked={!!state.races?.find(r => r === race)} onChange={handleRaceSelection} name="races" value={race} disabled={disabled} />}
                    label={race}
                  />
                ))
              }
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}
