import React, { useState } from "react"
import MomentUtils from "@date-io/moment"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import { useTheme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import WorkSearchRecord from "../../../models/WorkSearchRecord"

interface WorkSearchEditProps {
  workSearchRecord: WorkSearchRecord
  open: boolean
  onAccept?: (workSearchRecord: WorkSearchRecord) => void
  onCancel?: () => void
  isDisabled?: boolean
}

export default (props: WorkSearchEditProps) => {
  const { open, onAccept, onCancel } = props
  const [state, setState] = useState<WorkSearchRecord>(props.workSearchRecord)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setState({ ...state, [name]: value })
    console.log(state)
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
        <DialogTitle id="simple-dialog-title">Work Search Activity</DialogTitle>
        <DialogContent>
          <Grid container={true} spacing={2} direction="column">
            <Grid item={true}>
              <Grid container={true} spacing={2} direction="column">
                <Grid item={true} xs={12}>
                  <TextField
                    fullWidth={true}
                    value={state.employer}
                    name="employer"
                    onChange={handleTextChange}
                    label="Company Name"
                    variant="outlined"
                    disabled={props.isDisabled}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    fullWidth={true}
                    value={state.location}
                    name="location"
                    onChange={handleTextChange}
                    label="Location"
                    variant="outlined"
                    disabled={props.isDisabled}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    fullWidth={true}
                    value={state.contactMethod}
                    name="contactMethod"
                    onChange={handleTextChange}
                    label="Contact Method (in person, phone, resume)"
                    variant="outlined"
                    disabled={props.isDisabled}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                      <TextField
                        fullWidth={true}
                        value={state.typeOfWorkSought}
                        name="typeOfWorkSought"
                        onChange={handleTextChange}
                        label="Type of Work Sought"
                        variant="outlined"
                        disabled={props.isDisabled}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TextField
                        fullWidth={true}
                        value={state.result}
                        name="result"
                        onChange={handleTextChange}
                        label="Result (hired, not hired)"
                        variant="outlined"
                        disabled={props.isDisabled}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item={true} xs={12}>
                  <KeyboardDatePicker
                    fullWidth={true}
                    value={state.date}
                    onChange={handleDateChange}
                    label="Date"
                    format="MM/DD/YYYY"
                    inputVariant="outlined"
                    disabled={props.isDisabled}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true} spacing={2} justify="flex-end">
                <Grid item={true} />
                <Grid item={true} />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            disabled={props.isDisabled}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            onClick={handleCancel}
            disabled={props.isDisabled}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  )
}
