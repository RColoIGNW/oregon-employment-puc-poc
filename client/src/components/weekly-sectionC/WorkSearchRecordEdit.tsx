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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

import WorkSearchRecord from "../../models/WorkSearchRecord"

interface EmploymentRecordEditProps {
  workSearchRecord: WorkSearchRecord
  open: boolean
  onAccept?: (workSearchRecord: WorkSearchRecord) => void
  onCancel?: () => void
  isDisabled?: boolean
}

export default (props: EmploymentRecordEditProps) => {
  const { open, onAccept, onCancel } = props
  const [state, setState] = useState<WorkSearchRecord>(props.workSearchRecord)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEmployerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setState({ ...state, employer: value })
  }

  const handleDateChange = (value: MaterialUiPickersDate) => {
    value && setState({ ...state, date: value.toDate() })
  }

  const handleAccept = () => {
    onAccept && onAccept(state)
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
                  <TextField fullWidth value={state.employer} name="name" onChange={handleEmployerChange} label="Name of Employer" variant="outlined" disabled={props.isDisabled} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <KeyboardDatePicker fullWidth value={state.date} onChange={handleDateChange} label="Started" format="MM/DD/YYYY" inputVariant="outlined" disabled={props.isDisabled} />
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
