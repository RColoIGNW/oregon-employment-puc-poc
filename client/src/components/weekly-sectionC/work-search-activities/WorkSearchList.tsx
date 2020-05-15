import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import React, { useState } from "react"

import WorkSearchRecord from "../../../models/WorkSearchRecord"
import WorkSearchItem from "./WorkSearchItem"
import WorkSearchRecordEdit from "./WorkSearchRecordEdit"

const defaultValue: WorkSearchRecord = {
  type: "searching",
  employer: "",
  date: new Date(),
  location: "",
  contactMethod: "",
  typeOfWorkSought: "",
  result: "",
  activity: "",
}

interface WorkSearchListProps {
  workSearchRecords: WorkSearchRecord[]
  onAddWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => void
  onDeleteWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => void
  isDisabled?: boolean
}

export default (props: WorkSearchListProps) => {
  const { workSearchRecords } = props
  const [open, setOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<WorkSearchRecord>()

  const handleOpen = (WorkSearchRecord?: WorkSearchRecord) => {
    setSelectedRecord(WorkSearchRecord || defaultValue)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedRecord(undefined)
  }

  const onAddWorkSearchRecord = (workSearchRecord: WorkSearchRecord) => {
    props.onAddWorkSearchRecord &&
      props.onAddWorkSearchRecord(workSearchRecord)
    handleClose()
  }

  const onDeleteWorkSearchRecord = (workSearchRecord: WorkSearchRecord) => {
    props.onDeleteWorkSearchRecord &&
      props.onDeleteWorkSearchRecord(workSearchRecord)
  }

  return (
    <>
      <Grid container={true} spacing={1} justify="flex-start">
        {workSearchRecords?.map((workSearchRecord, index) => {
          if (workSearchRecord.type == "searching") {
            return (
              <Grid item={true} xs={12} sm={6} md={4} lg={3} key={index}>
                <WorkSearchItem
                  workSearchRecord={workSearchRecord}
                  onEditWorkSearchRecord={handleOpen}
                  onDeleteWorkSearchRecord={onDeleteWorkSearchRecord}
                  isDisabled={props.isDisabled}
                />
              </Grid>
            )
          } else {
            return null
          }
        })}
        {!props.isDisabled && (
          <Grid item={true} xs={12} sm={6} md={4} lg={3}>
            <Button
              fullWidth={true}
              component="div"
              variant="contained"
              size="large"
              color="primary"
              onClick={() => handleOpen()}
            >
              <Grid container={true} direction="column" alignItems="center">
                <Grid item={true}>
                  <AddIcon />
                </Grid>
                <Grid item={true}>
                  <Typography>Add work search activity</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        )}
      </Grid>
      {!props.isDisabled && selectedRecord && (
        <WorkSearchRecordEdit
          open={open}
          workSearchRecord={selectedRecord}
          onAccept={onAddWorkSearchRecord}
          onCancel={handleClose}
        />
      )}
    </>
  )
}
