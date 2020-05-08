import { Button, Card, CardContent, Typography, CardActions } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'
import React from 'react'

import WorkSearchRecord from "../../models/WorkSearchRecord"

interface WorkSearchItemProps {
  workSearchRecord: WorkSearchRecord
  onEditWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => void
  onDeleteWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => void
  isDisabled?: boolean
}

export default (props: WorkSearchItemProps) => {
  const { workSearchRecord, onDeleteWorkSearchRecord, onEditWorkSearchRecord } = props
  const { employer } = workSearchRecord

  const handleDelete = () => {
    onDeleteWorkSearchRecord(workSearchRecord)
  }

  const handleEdit = () => {
    onEditWorkSearchRecord(workSearchRecord)
  }

  return (
    <Card>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>{employer}</Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-between" spacing={2}>
              <Grid item>
                <strong>On</strong> {moment(workSearchRecord.date).format('MM/DD/YYYY')}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      {!props.isDisabled &&
      <CardActions>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleEdit} startIcon={<EditIcon />} color="primary">
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleDelete} startIcon={<DeleteIcon />} color="primary">
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      }
    </Card>
  )
}
