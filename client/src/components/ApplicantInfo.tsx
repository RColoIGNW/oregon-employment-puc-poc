import MomentUtils from '@date-io/moment';
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import React from 'react'

import Address from '../models/Address'
import Applicant from '../models/Applicant'
import { ContactMethod } from '../models/ContactMethod'
import { Gender } from '../models/Gender'
import { Race, Races } from '../models/Race'
import AddressEdit from './AddressEdit'
import PhoneTextField from './PhoneTextField'
import SSNTextField from './SSNTextField';

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
  adminNote: ''
}

interface ApplicantInfoProps {
  applicant?: Applicant,
  onChange: (applicant: Applicant) => void
  isDisabled?: boolean
}

export default (props: ApplicantInfoProps) => {
  const applicant = props.applicant || defaultValue
  const disabled = !!props.isDisabled

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    props.onChange({ ...applicant, [name]: value })
  }

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    props.onChange({ ...applicant, [name]: checked && value })
  }

  const handleBooleanSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    props.onChange({ ...applicant, [name]: checked && value === 'true' })
  }

  const handleDOBChange = (value: MaterialUiPickersDate) => {
    value && props.onChange({ ...applicant, dob: new Date(value.toDate()) })
  }

  const handleAddressChange = (address: Address) => {
    props.onChange({ ...applicant, address: address })
  }

  const handleRaceSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    const current = applicant.races
    checked
      ? current.push(value as Race)
      : current.splice(current.findIndex(r => r === value), 1)
    props.onChange({ ...applicant, races: current })
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField name="firstName" value={applicant.firstName} onChange={handleChange} fullWidth label="First Name" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="middleName" value={applicant.middleName} onChange={handleChange} fullWidth label="Middle Name" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="lastName" value={applicant.lastName} onChange={handleChange} fullWidth label="Last Name" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SSNTextField name="ssn" value={applicant.ssn} onChange={handleChange} fullWidth label="SSN" variant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <KeyboardDatePicker name="dob" value={applicant.dob} onChange={handleDOBChange} fullWidth label="DOB" format="MM/DD/YYYY" inputVariant="outlined" disabled={disabled} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressEdit isDisabled={disabled} address={applicant.address} onChange={handleAddressChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PhoneTextField name="phone" value={applicant.phone} onChange={handleChange} fullWidth label="Phone Number" variant="outlined" disabled={disabled} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" value={applicant.email} onChange={handleChange} fullWidth label="Email Address" variant="outlined" disabled={disabled} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Preferred Method of Contact</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={applicant.contactMethod === ContactMethod.Phone} onChange={handleSelection} name="contactMethod" value={ContactMethod.Phone} color="primary" disabled={disabled} />}
                label={ContactMethod.Phone}
              />
              <FormControlLabel
                control={<Radio checked={applicant.contactMethod === ContactMethod.Email} onChange={handleSelection} name="contactMethod" value={ContactMethod.Email} color="primary" disabled={disabled} />}
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
                control={<Radio checked={applicant.gender === Gender.Male} onChange={handleSelection} name="gender" value={Gender.Male} color="primary" disabled={disabled} />}
                label={Gender.Male}
              />
              <FormControlLabel
                control={<Radio checked={applicant.gender === Gender.Female} onChange={handleSelection} name="gender" value={Gender.Female} color="primary" disabled={disabled} />}
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
                control={<Radio checked={applicant.isHispanicLatino === true} onChange={handleBooleanSelection} name="isHispanicLatino" value={true} color="primary" disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={applicant.isHispanicLatino === false} onChange={handleBooleanSelection} name="isHispanicLatino" value={false} color="primary" disabled={disabled} />}
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
                    control={<Checkbox checked={!!applicant.races?.find(r => r === race)} onChange={handleRaceSelection} name="races" value={race} color="primary" disabled={disabled} />}
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
