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

import Address from "../models/Address"
import EmploymentRecord from "../models/EmploymentRecord"
import AddressEdit from "./AddressEdit"
import PhoneTextField from "./PhoneTextField"

interface EmploymentRecordEditProps {
  employmentRecord: EmploymentRecord
  open: boolean
  onAccept?: (employmentRecord: EmploymentRecord) => void
  onCancel?: () => void
  isDisabled?: boolean
}

export default (props: EmploymentRecordEditProps) => {
  const { open, onAccept, onCancel } = props
  const [state, setState] = useState<EmploymentRecord>(props.employmentRecord)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleEmployerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState({ ...state, employer: { ...state.employer, [name]: value } })
  }

  const handleAddressChange = (address: Address) => {
    setState({ ...state, employer: { ...state.employer, address } })
  }

  const handleStartedChange = (value: MaterialUiPickersDate) => {
    value && setState({ ...state, started: value.toDate() })
  }

  const handleEndedChange = (value: MaterialUiPickersDate) => {
    value && setState({ ...state, ended: value.toDate() })
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
          <Grid container={true} direction="column" spacing={2}>
            <Grid item={true} />
            <Grid item={true}>
              <Grid container={true} spacing={2} direction="column">
                <Grid item={true} xs={12}>
                  <TextField
                    fullWidth={true}
                    value={state.employer.name}
                    name="name"
                    onChange={handleEmployerChange}
                    label="Name of Employer"
                    variant="outlined"
                    disabled={props.isDisabled}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <PhoneTextField
                    fullWidth={true}
                    value={state.employer.phone}
                    name="phone"
                    onChange={handleEmployerChange}
                    label="Phone Number"
                    variant="outlined"
                    disabled={props.isDisabled}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <AddressEdit
                    address={state.employer.address}
                    onChange={handleAddressChange}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12} sm={6}>
                      <KeyboardDatePicker
                        fullWidth={true}
                        value={state.started}
                        onChange={handleStartedChange}
                        label="Started"
                        format="MM/DD/YYYY"
                        inputVariant="outlined"
                        disabled={props.isDisabled}
                      />
                    </Grid>
                    <Grid item={true} xs={12} sm={6}>
                      <KeyboardDatePicker
                        fullWidth={true}
                        value={state.ended}
                        onChange={handleEndedChange}
                        label="Ended"
                        format="MM/DD/YYYY"
                        inputVariant="outlined"
                        disabled={props.isDisabled}
                      />
                    </Grid>
                  </Grid>
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
