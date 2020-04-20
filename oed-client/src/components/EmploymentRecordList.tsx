import React from 'react'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import EmploymentRecordItem from './EmploymentRecordItem'
import EmploymentRecord from '../models/EmploymentRecord'
import Modal from '@material-ui/core/Modal'
import EmploymentRecordEdit from './EmploymentRecordEdit'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: 'absolute',
      width: 320,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

interface EmploymentRecordListProps {
  employmentRecords: EmploymentRecord[]
  onAddEmploymentRecord: (employmentRecord: EmploymentRecord) => void
}

export default (props: EmploymentRecordListProps) => {
  const { employmentRecords, onAddEmploymentRecord } = props
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} justify="flex-start" alignItems="center" >
        {
          employmentRecords.map((employmentRecord, index) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <EmploymentRecordItem employmentRecord={employmentRecord} />
            </Grid>
          )
        }
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Fab color="primary" size="large" onClick={handleOpen}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card style={modalStyle} className={classes.card}>
          <CardContent>
            <h2>Add an employment record</h2>
            <EmploymentRecordEdit onAccept={onAddEmploymentRecord} />
          </CardContent>
        </Card>
      </Modal>

    </>
  )
}
