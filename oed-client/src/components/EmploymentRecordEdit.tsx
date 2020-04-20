import React, { useState } from 'react'
import EmploymentRecord from '../models/EmploymentRecord'
import TextField from '@material-ui/core/TextField'
import AddressEdit from './AddressEdit'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

interface EmploymentRecordEditProps {
  employmentRecord?: EmploymentRecord
  onAccept: (employmentRecord: EmploymentRecord) => void
}

export default (props: EmploymentRecordEditProps) => {
  const [employmentRecord, setEmploymentRecord] = useState(props.employmentRecord || {} as EmploymentRecord)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setEmploymentRecord({ ...employmentRecord, name: event.target.value })
  }

  const handleStartedChange = (value: MaterialUiPickersDate) => {
//    value && setStarted(value.toDate())
  }

  const onAccept = () => {
    props.onAccept && props.onAccept(employmentRecord)
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>

      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TextField fullWidth id="employer-name" label="Name of Employer" variant="outlined" onChange={onNameChange} />
        </Grid>
        <Grid item xs={12}>
          <AddressEdit />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker fullWidth value={started} onChange={handleStartedChange} format="MM/DD/YYYY" inputVariant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <DatePicker fullWidth value={started} onChange={handleStartedChange} format="MM/DD/YYYY" inputVariant="outlined" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <Button variant="contained" color="primary" onClick={onAccept}>
                Accept
            </Button>
            </Grid>
            <Grid item>
              <Button variant="contained">
                Cancel
            </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}
