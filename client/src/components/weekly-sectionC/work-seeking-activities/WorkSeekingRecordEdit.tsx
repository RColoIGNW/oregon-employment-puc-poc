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
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import React, { useState } from "react"

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
            <Grid item={true} xs={12}>
              <TextField
                fullWidth={true}
                value={state.activity}
                name="activity"
                onChange={handleTextChange}
                label="Activity"
                variant="outlined"
                disabled={props.isDisabled}
              />
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
