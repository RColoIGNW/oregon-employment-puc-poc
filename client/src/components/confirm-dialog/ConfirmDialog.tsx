import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import React from "react"

const defaultInfo = {
  title: "Are you sure?",
  description: "",
  confirmActionText: "Yes",
  cancelActionText: "No",
}

export interface ConfirmDialogProps {
  open: boolean
  title?: string
  description?: string
  confirmActionText?: string
  cancelActionText?: string
  onConfirm: () => void
  onCancel: () => void
}
const ConfirmDialog = (props: ConfirmDialogProps) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleCancel = () => {
    props.onCancel && props.onCancel()
  }
  const handleConfirm = () => {
    props.onConfirm && props.onConfirm()
  }

  return (
    <Dialog
      open={props.open}
      fullScreen={fullScreen}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {props.title || defaultInfo.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.description || defaultInfo.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"primary"} onClick={handleConfirm}>
          {props.confirmActionText || defaultInfo.confirmActionText}
        </Button>
        <Button variant={"contained"} onClick={handleCancel}>
          {props.cancelActionText || defaultInfo.cancelActionText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
