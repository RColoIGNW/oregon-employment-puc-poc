import React, { useState } from 'react'
import EmploymentRecord from '../models/EmploymentRecord'
import TextField from '@material-ui/core/TextField'
import AddressEdit from './AddressEdit'
import Grid from '@material-ui/core/Grid'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { Address } from '../models/Address'

const validate = (name: string, value: string): string => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Enter employer name'
      break
    case 'phone':
      if (!value.trim()) return 'Enter employer phone'
      break
    default: return ''
  }
  return ''
}

interface EmploymentRecordEditProps {
  employmentRecord?: EmploymentRecord
  onAccept: (employmentRecord: EmploymentRecord) => void
}

const defaultValue: EmploymentRecord = {
  employer: {
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
  },
  started: new Date(),
  ended: new Date()
}

export default (props: EmploymentRecordEditProps) => {
  const employmentRecord = props.employmentRecord || defaultValue
  const [state, setState] = useState(
    {
      value: {
        ...employmentRecord.employer,
        started: employmentRecord.started,
        ended: employmentRecord.ended,
      },
      errors: {}
    }
  )

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState({ value: { ...state.value, [name]: value }, errors: { ...state.errors, [name]: validate(name, value) } })
  }

  const handleStartedChange = (value: MaterialUiPickersDate) => {
    //    value && setStarted(value.toDate())
  }

  const onAddressCompleted = (address: Address) => {
    setState({ value: { ...state.value, address: address }, errors: { ...state.errors } })
  }

  const onAccept = () => {
    props.onAccept && props.onAccept({
      employer: {
        name: state.value.name,
        address: state.value.address,
        phone: state.value.phone
      },
      started: state.value.started,
      ended: state.value.ended
    })
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>

      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TextField fullWidth value={state.value.name} name="name" onChange={onChange} label="Name of Employer" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth value={state.value.phone} name="phone" onChange={onChange} label="Phone Number" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <AddressEdit onCompletion={onAddressCompleted} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker fullWidth value={state.value.started} onChange={handleStartedChange} format="MM/DD/YYYY" inputVariant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <DatePicker fullWidth value={state.value.ended} onChange={handleStartedChange} format="MM/DD/YYYY" inputVariant="outlined" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}
