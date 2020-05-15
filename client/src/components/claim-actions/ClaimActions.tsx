import { Grid, IconButton, Tooltip } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import SaveAltIcon from "@material-ui/icons/SaveAlt"
import React, { useState } from "react"

import ConfirmDialog from "../confirm-dialog/ConfirmDialog"

export interface ClaimActionsProps {
  disableEdit?: boolean
  disableDiscard?: boolean
  disableDownload?: boolean
  onEdit?: () => void
  onDownload?: () => void
  onDiscard?: () => void
  confirmDiscard?: boolean
}
const ClaimActions = (props: ClaimActionsProps) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)

  const handleDiscard = () => {
    props.onDiscard && setOpenConfirm(true)
  }
  const handleConfirmDiscard = () => {
    setOpenConfirm(false)
    props.onDiscard && props.onDiscard()
  }

  const handleCancelDiscard = () => {
    setOpenConfirm(false)
  }
  return (
    <>
      <Grid
        container={true}
        direction={"row"}
        justify={"flex-end"}
        spacing={0}
        style={{ background: "white" }}
      >
        <Grid item={true}>
          <IconButton
            aria-label="edit claim"
            onClick={() => props.onEdit && props.onEdit()}
            disabled={!!props.disableEdit}
          >
            <Tooltip title="Continue application">
              <EditIcon
                fontSize={"small"}
                color={props.disableEdit ? "disabled" : "primary"}
              />
            </Tooltip>
          </IconButton>
        </Grid>
        <Grid item={true}>
          <IconButton
            aria-label="download claim"
            onClick={() => props.onDownload && props.onDownload()}
            disabled={!!props.disableDownload}
          >
            <Tooltip title="Download application (PDF)">
              <SaveAltIcon
                fontSize={"small"}
                color={props.disableDownload ? "disabled" : "primary"}
              />
            </Tooltip>
          </IconButton>
        </Grid>
        <Grid item={true}>
          <IconButton
            aria-label="delete claim"
            onClick={handleDiscard}
            disabled={!!props.disableDiscard}
          >
            <Tooltip title="Discard application">
              <DeleteIcon
                fontSize={"small"}
                color={props.disableDiscard ? "disabled" : "primary"}
              />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={openConfirm}
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
      />
    </>
  )
}

export default ClaimActions
