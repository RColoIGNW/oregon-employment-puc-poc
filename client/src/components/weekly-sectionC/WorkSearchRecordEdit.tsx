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
import questions from "../weekly-form/questions"

import {
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"

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

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setState({ ...state, [name]: value })
    console.log(state)
  }

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    setState({ ...state, [value]: checked })
    value === "unionMember" && setExpandedUnion(false);
    value === "tempLayoff" && setExpandedTempLayoff(false);
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

  const [expandedUnion, setExpandedUnion] = React.useState(false);
  const [expandedTempLayoff, setExpandedTempLayoff] = React.useState(false);


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleCancel}>
        <DialogTitle id="simple-dialog-title">Work Search Activity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                  <TextField fullWidth value={state.employer} name="employer" onChange={handleTextChange} label="Company Name" variant="outlined" disabled={props.isDisabled} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth value={state.location} name="location" onChange={handleTextChange} label="Location" variant="outlined" disabled={props.isDisabled} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth value={state.contactMethod} name="contactMethod" onChange={handleTextChange} label="Contact Method (in person, phone, resume)" variant="outlined" disabled={props.isDisabled} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth value={state.typeOfWorkSought} name="typeOfWorkSought" onChange={handleTextChange} label="Type of Work Sought" variant="outlined" disabled={props.isDisabled} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth value={state.result} name="result" onChange={handleTextChange} label="Result (hired, not hired)" variant="outlined" disabled={props.isDisabled} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <KeyboardDatePicker fullWidth value={state.date} onChange={handleDateChange} label="Started" format="MM/DD/YYYY" inputVariant="outlined" disabled={props.isDisabled} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ExpansionPanel expanded={expandedUnion} onChange={() => setExpandedUnion(true)} elevation={expandedUnion ? 1 : 0}>
                <ExpansionPanelSummary
                  expandIcon={expandedUnion ? null : <Typography>Read more</Typography>}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <FormControlLabel
                    aria-label="Acknowledge"
                    value={'unionMember'}
                    control={<Checkbox onChange={handleCheckBoxChange} />}
                    label="Check here if you are a union member in good standing."
                  />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container direction={'column'}>
                    <List component="nav" aria-label="main mailbox folders">
                      {
                        questions.unionMemberMessage.map((textSection) => {
                          return (
                            <ListItem>
                              <ListItemText primary={textSection}/>
                            </ListItem>
                          )
                        })
                      }
                    </List>
                    <Grid style={{display: 'flex', justifyContent: 'flex-end'}}>
                      <Button onClick={() => {setExpandedUnion(false)}}>Ok</Button>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expandedTempLayoff} onChange={() => setExpandedTempLayoff(true)} style={{paddingTop: 15}} elevation={expandedTempLayoff ? 1 : 0}>
                <ExpansionPanelSummary
                  expandIcon={expandedTempLayoff ? null : <Typography>Read more</Typography>}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <FormControlLabel
                    aria-label="Acknowledge"
                    value={'tempLayoff'}
                    control={<Checkbox onChange={handleCheckBoxChange} />}
                    label="Check here if you are on a temporary layoff (TLO)"
                  />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container direction={'column'}>
                    <List component="nav" aria-label="main mailbox folders">
                      {
                        questions.tempLayoffMessage.map((textSection) => {
                          return (
                            <ListItem>
                              <ListItemText primary={textSection}/>
                            </ListItem>
                          )
                        })
                      }
                    </List>
                    <Grid style={{display: 'flex', justifyContent: 'flex-end'}}>
                      <Button onClick={() => {setExpandedTempLayoff(false)}}>Ok</Button>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
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
