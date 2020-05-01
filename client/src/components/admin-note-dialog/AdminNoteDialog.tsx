import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import React from 'react'

export default function FormDialog(props: {
  open: boolean,
  onCancel: () => any,
  onSave: () => any,
  handleChange: (event: { target: { value: string } }) => any,
  adminNote: string,
}) {
  const handleClose = () => {
    props.onCancel()
  }

  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Admin Note</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add an admin note to the application
        </DialogContentText>
        <TextField
          multiline
          autoFocus
          name="adminNote"
          label="Admin Note"
          type="text"
          style={{ height: '4em' }}
          fullWidth
          onChange={props?.handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props?.onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
