import React from 'react'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import EmploymentRecord from '../models/EmploymentRecord'
import { Card, Typography, CardContent, Button } from '@material-ui/core'
import AddressDisplay from './AddressDisplay'
import moment from 'moment'
import PhoneNumberDisplay from './PhoneNumberDisplay'

interface EmploymentRecordItemProps {
  employmentRecord: EmploymentRecord
  onDeleteEmploymentRecord: (employmentRecord: EmploymentRecord) => void
  onEditEmploymentRecord: (employmentRecord: EmploymentRecord) => void
}

export default (props: EmploymentRecordItemProps) => {
  const { employmentRecord, onDeleteEmploymentRecord, onEditEmploymentRecord } = props
  const { employer } = employmentRecord

  const handleDelete = () => {
    onDeleteEmploymentRecord(employmentRecord)
  }

  const handleEdit = () => {
    onEditEmploymentRecord(employmentRecord)
  }

  return (
    <Card>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">{employer.name}</Typography>
          </Grid>
          <Grid item style={{ alignSelf: "flex-end" }}>
            <AddressDisplay address={employer.address} />
          </Grid>
          <Grid item style={{ alignSelf: "flex-end" }}>
            <PhoneNumberDisplay phoneNumber={employer.phone} />
          </Grid>
          <Grid item>
            <Grid container justify="space-between" spacing={2}>
              <Grid item>
                <strong>From</strong> {moment(employmentRecord.started).format('MM/DD/YYYY')}
              </Grid>
              <Grid item>
                <strong>To</strong> {moment(employmentRecord.ended).format('MM/DD/YYYY')}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Button onClick={handleEdit} variant="contained" startIcon={<EditIcon />}>
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleDelete} variant="contained" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}