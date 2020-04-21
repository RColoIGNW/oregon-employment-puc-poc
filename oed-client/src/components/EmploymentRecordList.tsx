import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import EmploymentRecordItem from './EmploymentRecordItem'
import EmploymentRecord from '../models/EmploymentRecord'
import EmploymentRecordEdit from './EmploymentRecordEdit'
import { Button } from '@material-ui/core'

interface EmploymentRecordListProps {
  employmentRecords: EmploymentRecord[]
  onAddEmploymentRecord: (employmentRecord: EmploymentRecord) => void
  onDeleteEmploymentRecord: (employmentRecord: EmploymentRecord) => void
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
          employmentRecords.map((employmentRecord, index) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <EmploymentRecordItem
                employmentRecord={employmentRecord}
                onEditEmploymentRecord={handleOpen}
                onDeleteEmploymentRecord={onDeleteEmploymentRecord}
              />
            </Grid>
          )
        }
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />} onClick={() => handleOpen()}>
                Add employment record
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <EmploymentRecordEdit open={open} employmentRecord={selectedRecord} onAccept={onAddEmploymentRecord} onCancel={handleClose} />
    </>
  )
}
