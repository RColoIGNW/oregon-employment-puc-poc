import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { Grid, RadioGroup, Radio } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

import Applicant from '../models/Applicant'
import { Gender } from '../models/Gender'
import { ContactMethod } from '../models/ContactMethod'
import { Races } from '../models/Race'
import AddressEdit from './AddressEdit'

interface ApplicantInfoProps {
  applicant?: Applicant
}

export default (props: ApplicantInfoProps) => {
  const applicant = props.applicant || {} as Applicant

  const [selectedDate, handleDateChange] = useState(applicant.dob);

  const handleChange = () => { }

  const handleDOBChange = (value: MaterialUiPickersDate) => {
    value && handleDateChange(value.toDate())
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth id="applicant-first-name" label="First Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth id="applicant-middle-name" label="Middle Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth id="applicant-last-name" label="Last Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressEdit />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth id="applicant-ssn" label="SSN" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <DatePicker fullWidth value={selectedDate} onChange={handleDOBChange} format="MM/DD/YYYY" inputVariant="outlined" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth id="applicant-phone" label="Phone Number" variant="outlined" type="phone" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="applicant-email" label="Email Address" variant="outlined" type="email" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Preferred Method of Contact</FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio checked={applicant.contactMethod === ContactMethod.Phone} onChange={handleChange} name="applicant-contact-method" />}
                label={ContactMethod.Phone}
              />
              <FormControlLabel
                control={<Radio checked={applicant.contactMethod === ContactMethod.Email} onChange={handleChange} name="applicant-contact-method" />}
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
                control={<Radio checked={applicant.gender === Gender.Male} onChange={handleChange} name="applicant-gender" />}
                label={Gender.Male}
              />
              <FormControlLabel
                control={<Radio checked={applicant.gender === Gender.Female} onChange={handleChange} name="applicant-gender" />}
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
                control={<Radio checked={applicant.isHispanicLatino !== undefined && applicant.isHispanicLatino} onChange={handleChange} name="applicant-isHispanicLatino" />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio checked={applicant.isHispanicLatino !== undefined && !applicant.isHispanicLatino} onChange={handleChange} name="applicant-isHispanicLatino" />}
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
                    control={<Checkbox checked={!!applicant.races?.find(r => r === race)} onChange={handleChange} name="applicant-races" />}
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