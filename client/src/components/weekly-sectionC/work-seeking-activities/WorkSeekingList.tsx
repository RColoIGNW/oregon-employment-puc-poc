import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'

import WorkSearchRecord from "../../../models/WorkSearchRecord"
import WorkSeekingItem from "./WorkSeekingItem"
import WorkSeekingRecordEdit from "./WorkSeekingRecordEdit"

const defaultValue: WorkSearchRecord = {
  type: 'seeking',
  employer: '',
  date: new Date(),
  location: '',
  contactMethod: '',
  typeOfWorkSought: '',
  result: '',
  activity: ''
}

interface WorkSearchListProps {
  workSearchRecords: WorkSearchRecord[]
  onAddWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => void
  onDeleteWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => void
  isDisabled?: boolean
}

export default (props: WorkSearchListProps) => {
  const { workSearchRecords } = props
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<WorkSearchRecord>()

  const handleOpen = (WorkSearchRecord?: WorkSearchRecord) => {
    setSelectedRecord(WorkSearchRecord || defaultValue)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecord(undefined)
  };

  const onAddWorkSearchRecord = (workSearchRecord: WorkSearchRecord) => {
    props.onAddWorkSearchRecord && props.onAddWorkSearchRecord(workSearchRecord)
    handleClose()
  }

  const onDeleteWorkSearchRecord = (workSearchRecord: WorkSearchRecord) => {
    props.onDeleteWorkSearchRecord && props.onDeleteWorkSearchRecord(workSearchRecord)
  }

  return (
    <>
      <Grid container spacing={1} justify="flex-start" >
        {
          workSearchRecords?.map((workSearchRecord, index) => {
            if(workSearchRecord.type == 'seeking') {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <WorkSeekingItem
                    workSearchRecord={workSearchRecord}
                    onEditWorkSearchRecord={handleOpen}
                    onDeleteWorkSearchRecord={onDeleteWorkSearchRecord}
                    isDisabled={props.isDisabled}
                  />
                </Grid>
              )
            }
            else {
              return null
            }
          }
          )
        }
        {!props.isDisabled &&
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button fullWidth component="div" variant="contained" size="large" color="primary" onClick={() => handleOpen()}>
            <Grid container direction="column" alignItems="center">
              <Grid item><AddIcon /></Grid>
              <Grid item><Typography>Add work seeking activity</Typography></Grid>
            </Grid>
          </Button>
        </Grid>
        }
      </Grid>
      {!props.isDisabled && selectedRecord &&
      <WorkSeekingRecordEdit open={open} workSearchRecord={selectedRecord} onAccept={onAddWorkSearchRecord} onCancel={handleClose} />
      }
    </>
  )
}
