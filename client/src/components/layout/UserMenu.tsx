import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Divider from '@material-ui/core/Divider'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Grid from '@material-ui/core/Grid'

import { AuthContext } from '../../providers/AuthProvider';

export const UserMenu = () => {
  const { signOut, user } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <>
      {user?.displayName}
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  )
}

export const UserMenuMobile = () => {
  const { signOut, user } = useContext(AuthContext)

  return (
    <Grid container alignItems="center">
      <Grid item>
        <PersonIcon style={{ fontSize: 68 }} />
        {user?.displayName}
      </Grid>
      <Grid item>
        {user?.displayName || user?.email}
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Grid item>
            <Button color="primary">Profile</Button>
          </Grid>
          <Grid item>
            <Button color="primary" onClick={signOut} endIcon={<ExitToAppIcon />}>Sign out</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
