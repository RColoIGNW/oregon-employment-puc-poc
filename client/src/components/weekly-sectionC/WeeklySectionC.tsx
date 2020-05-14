import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import React, { useEffect, useState } from "react"
import WorkSearchRecord from "../../models/WorkSearchRecord"
import WorkSearchList from "./work-search-activities/WorkSearchList"
import WorkSeekingList from "./work-seeking-activities/WorkSeekingList"
import {
  Checkbox,
  ExpansionPanel, ExpansionPanelDetails,
  ExpansionPanelSummary, FormControlLabel,
  Grid, List, ListItem, ListItemText,
  Typography,
} from "@material-ui/core"
import questions from "../weekly-form/questions"
import Button from "@material-ui/core/Button"
import HelpIcon from "@material-ui/icons/Help"
import HelpDialog from "./HelpDialog"

export default (props: WeeklySectionProps) => {
  const {application} = props;
  const [workSearchRecords, setWorkSearchRecords] = useState<WorkSearchRecord[]>(props.application.workSearchRecords || [])

  const addWorkSearchRecord = (workSearchRecord: WorkSearchRecord) => {
    if (workSearchRecord.id) {
      updateEmploymentRecord(workSearchRecord)
    } else {
      workSearchRecord.id = Date.now()
      setWorkSearchRecords([...workSearchRecords, workSearchRecord])
    }
  }

  const updateEmploymentRecord = (workSearchRecord: WorkSearchRecord) => {
    const index = workSearchRecords.findIndex(r => r.id === workSearchRecord.id)
    workSearchRecords.splice(index, 1, workSearchRecord)
    setWorkSearchRecords([...workSearchRecords])
  }

  const deleteEmploymentRecord = (workSearchRecord: WorkSearchRecord) => {
    const index = workSearchRecords.findIndex(r => r.id === workSearchRecord.id)
    workSearchRecords.splice(index, 1)
    setWorkSearchRecords([...workSearchRecords])
  }

  useEffect(() => {
    props.handleWorkSearchChange({...application, workSearchRecords: workSearchRecords})
  }, [workSearchRecords])

  const [expandedDescription, setExpandedDescription] = React.useState(false);
  const setOpen = (open: boolean) => {setExpandedDescription(open)}

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    props.handleChange({...application, [value]: checked})
    value === "unionMember" && setExpandedUnion(false);
    value === "tempLayoff" && setExpandedTempLayoff(false);
  }

  const [expandedUnion, setExpandedUnion] = React.useState(false);
  const [expandedTempLayoff, setExpandedTempLayoff] = React.useState(false);


  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Grid container spacing={2} direction="column">
          <Typography style={{padding:10}}>
            {questions.workSearchMessage}
          </Typography>
          <Typography style={{padding:10}}>
            {questions.workSearchMessagept2}
          </Typography>
          <Grid style={{display: 'flex', paddingLeft: 10, paddingBottom: 15}}>
            <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setExpandedDescription(true)}>Help</Button>
            {expandedDescription && <HelpDialog title={'Work Search Activity'} textSections={questions.helpDialog} openFn={setOpen}/>}
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction={'column'}>
        <Grid item style={{paddingBottom: 10}}>
          <WorkSearchList
            isDisabled={props.isDisabled}
            workSearchRecords={workSearchRecords}
            onAddWorkSearchRecord={addWorkSearchRecord}
            onDeleteWorkSearchRecord={deleteEmploymentRecord} />
        </Grid>
        <Grid item style={{paddingBottom: 10}}>
          <WorkSeekingList
            isDisabled={props.isDisabled}
            workSearchRecords={workSearchRecords}
            onAddWorkSearchRecord={addWorkSearchRecord}
            onDeleteWorkSearchRecord={deleteEmploymentRecord} />
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
                  questions.unionMemberMessage.map((textSection, index) => {
                    return (
                      <ListItem key={index}>
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
                  questions.tempLayoffMessage.map((textSection, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText primary={textSection} key={index}/>
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
    </Grid>
  )
}
