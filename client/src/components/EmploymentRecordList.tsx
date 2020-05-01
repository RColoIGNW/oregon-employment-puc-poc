import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'

import EmploymentRecord from '../models/EmploymentRecord'
import EmploymentRecordEdit from './EmploymentRecordEdit'
import EmploymentRecordItem from './EmploymentRecordItem'

interface EmploymentRecordListProps {
  employmentRecords: EmploymentRecord[]
  onAddEmploymentRecord: (employmentRecord: EmploymentRecord) => void
  onDeleteEmploymentRecord: (employmentRecord: EmploymentRecord) => void
  isDisabled?: boolean
}

export default (props: EmploymentRecordListProps) => {
  const { employmentRecords } = props
  const [open, setOpen] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EmploymentRecord>()

  const handleOpen = (employmentRecord?: EmploymentRecord) => {
    setSelectedRecord(employmentRecord)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    props.onAddEmploymentRecord && props.onAddEmploymentRecord(employmentRecord)
    handleClose()
  }

  const onDeleteEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    props.onDeleteEmploymentRecord && props.onDeleteEmploymentRecord(employmentRecord)
  }

  return (
    <>
      <Grid container spacing={2} justify="flex-start" alignItems="center" >
        {
          employmentRecords?.map((employmentRecord, index) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <EmploymentRecordItem
                employmentRecord={employmentRecord}
                onEditEmploymentRecord={handleOpen}
                onDeleteEmploymentRecord={onDeleteEmploymentRecord}
                isDisabled={props.isDisabled}
              />
            </Grid>
          )
        }
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Button component="div" variant="contained" size="large" disabled={!!props.isDisabled} color="primary" onClick={() => handleOpen()}>
                <Grid container direction="column" alignItems="center">
                  <Grid item><AddIcon /></Grid>
                  <Grid item><Typography>Add employment record</Typography></Grid>
                </Grid>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <EmploymentRecordEdit isDisabled={props.isDisabled} open={open} employmentRecord={selectedRecord} onAccept={onAddEmploymentRecord} onCancel={handleClose} />
    </>
  )
}
