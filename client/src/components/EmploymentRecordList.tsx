import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import React, { useState } from "react"

import EmploymentRecord from "../models/EmploymentRecord"
import EmploymentRecordEdit from "./EmploymentRecordEdit"
import EmploymentRecordItem from "./EmploymentRecordItem"

const defaultValue: EmploymentRecord = {
  employer: {
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  started: new Date(),
  ended: new Date(),
}

interface EmploymentRecordListProps {
  employmentRecords: EmploymentRecord[]
  onAddEmploymentRecord: (employmentRecord: EmploymentRecord) => void
  onDeleteEmploymentRecord: (employmentRecord: EmploymentRecord) => void
  isDisabled?: boolean
}

export default (props: EmploymentRecordListProps) => {
  const { employmentRecords } = props
  const [open, setOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<EmploymentRecord>()

  const handleOpen = (employmentRecord?: EmploymentRecord) => {
    setSelectedRecord(employmentRecord || defaultValue)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedRecord(undefined)
  }

  const onAddEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    props.onAddEmploymentRecord &&
      props.onAddEmploymentRecord(employmentRecord)
    handleClose()
  }

  const onDeleteEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    props.onDeleteEmploymentRecord &&
      props.onDeleteEmploymentRecord(employmentRecord)
  }

  return (
    <>
      <Grid container={true} spacing={1} justify="flex-start">
        {employmentRecords?.map((employmentRecord, index) => (
          <Grid item={true} xs={12} sm={6} md={4} lg={3} key={index}>
            <EmploymentRecordItem
              employmentRecord={employmentRecord}
              onEditEmploymentRecord={handleOpen}
              onDeleteEmploymentRecord={onDeleteEmploymentRecord}
              isDisabled={props.isDisabled}
            />
          </Grid>
        ))}
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
                  <Typography>Add employment record</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        )}
      </Grid>
      {!props.isDisabled && selectedRecord && (
        <EmploymentRecordEdit
          open={open}
          employmentRecord={selectedRecord}
          onAccept={onAddEmploymentRecord}
          onCancel={handleClose}
        />
      )}
    </>
  )
}
