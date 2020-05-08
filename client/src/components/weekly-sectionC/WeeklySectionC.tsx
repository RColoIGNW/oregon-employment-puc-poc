import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import React, { useEffect, useState } from "react"
import WorkSearchRecord from "../../models/WorkSearchRecord"
import WorkSearchList from "./WorkSearchList"
import { Grid, Typography } from "@material-ui/core"
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

      <WorkSearchList
        isDisabled={props.isDisabled}
        workSearchRecords={workSearchRecords}
        onAddWorkSearchRecord={addWorkSearchRecord}
        onDeleteWorkSearchRecord={deleteEmploymentRecord} />
    </Grid>
  )
}
