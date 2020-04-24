import React, { useState } from 'react'
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

import Address from '../models/Address'
import EmploymentRecord from '../models/EmploymentRecord'
import AddressEdit from './AddressEdit'
import PhoneTextField from './PhoneTextField';

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
  open: boolean
  onAccept?: (employmentRecord: EmploymentRecord) => void
  onCancel?: () => void
  isDisabled?: boolean
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
  const { open, onAccept, onCancel } = props
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    value && setState({value: { ...state.value, started: value.toDate() }, errors: { ...state.errors}})
  }

  const handleEndedChange = (value: MaterialUiPickersDate) => {
    value && setState({value: { ...state.value, ended: value.toDate() }, errors: { ...state.errors}})
  }

  const onAddressCompleted = (address: Address) => {
    setState({ value: { ...state.value, address: address }, errors: { ...state.errors } })
  }

  const handleAccept = () => {
    onAccept && onAccept({
      employer: {
        name: state.value.name,
        address: state.value.address,
        phone: state.value.phone
      },
      started: state.value.started,
      ended: state.value.ended
    })
  }

  const handleCancel = () => {
    onCancel && onCancel()
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleCancel}>
        <DialogTitle id="simple-dialog-title">Employment record</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
            </Grid>
            <Grid item>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                  <TextField fullWidth value={state.value.name} name="name" onChange={onChange} label="Name of Employer" variant="outlined" disabled={props.isDisabled} />
                </Grid>
                <Grid item xs={12}>
                  <PhoneTextField fullWidth value={state.value.phone} name="phone" onChange={onChange} label="Phone Number" variant="outlined" disabled={props.isDisabled} />
                </Grid>
                <Grid item xs={12}>
                  <AddressEdit onCompletion={onAddressCompleted} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <DatePicker fullWidth value={state.value.started} onChange={handleStartedChange} format="MM/DD/YYYY" inputVariant="outlined" disabled={props.isDisabled} />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker fullWidth value={state.value.ended} onChange={handleEndedChange} format="MM/DD/YYYY" inputVariant="outlined" disabled={props.isDisabled} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleAccept} disabled={props.isDisabled}>
            Accept
          </Button>
          <Button variant="contained" onClick={handleCancel} disabled={props.isDisabled}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  )
}
