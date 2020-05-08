import React, { useState } from 'react'
import moment from 'moment'

import { 
  Card, 
  CardContent, 
  Grid, 
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ConfirmDialog from '../confirm-dialog/ConfirmDialog'

export interface ClaimProps {
  claimId: string
  claimDate?: Date //Receive last modify date or submitted date
  claimStatus?: string  
  disableEdit?: boolean
  disableDownload?: boolean
  disableDiscard?: boolean
  onEdit: (applicationId: string) => void
  onDownload: (applicationId: string) => void
  onDiscard: (applicationId: string) => void
}

const Claim = (props: ClaimProps) => {  
  const { claimId, claimDate, claimStatus } = props
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)

  //#region Actions
  const handleEdit = () => {
    props.onEdit && props.onEdit(claimId)
    handleCloseMenu()
  }

  const handleDownload = () => {
    props.onDownload && props.onDownload(claimId)
    handleCloseMenu()
  }

  const handleDiscard = () => {
    setOpenConfirm(true)    
    handleCloseMenu()
  }

  const handleConfirmDiscard = () => {
    props.onDiscard && props.onDiscard(claimId)
    setOpenConfirm(false)
    
  }

  const handleCancelDiscard = () => {
    setOpenConfirm(false)    
  }
  //#endregion

  //#region Menu
  const menuActions = [
    {
      text: 'Edit',
      onClick: handleEdit,
      isDisabled: props.disableEdit || false
    },
    {
      text: 'Discard',
      onClick: handleDiscard,
      isDisabled: props.disableDiscard || false

    },
    {
      text: 'Download',
      onClick: handleDownload,
      isDisabled: props.disableDownload || false
    }
  ]
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {    
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  //#endregion
  
  return (
    <>
    <Card>
      <CardContent>                
        <Grid container justify="space-between" style={{ flexWrap: "nowrap" }}>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="body1" color="primary" style={{ fontWeight: 'bold' }}>
                  <Link component={'button'} onClick={handleEdit}>
                    {claimId}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{claimDate && moment(claimDate).format('MMM D, YYYY')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="secondary" style={{ fontWeight: 'bold' }}>
                  {claimStatus}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton 
              aria-label="menu" 
              aria-controls="claim-menu" 
              aria-haspopup="true" 
              onClick={handleOpenMenu}
            >
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <ConfirmDialog open={openConfirm} onConfirm={handleConfirmDiscard} onCancel={handleCancelDiscard}/>
    <Menu
      id={'claim-menu'}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      {menuActions.map((action, index) => (
        <MenuItem key={index} onClick={action.onClick} disabled={action.isDisabled}>{action.text}</MenuItem>
      ))}
    </Menu>
    </>
  )
}

export default Claim