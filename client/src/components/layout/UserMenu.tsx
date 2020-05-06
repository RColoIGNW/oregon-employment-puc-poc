import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { AuthContext } from '../../providers/AuthProvider'
import { Divider, Hidden } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import Button from '@material-ui/core/Button'

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
  return (
    <div style={{ padding: '0 16', minHeight: 150 }}>
      <PersonIcon style={{ fontSize: 68 }} />
      <br />
      <Button color="primary">My Account</Button>
      <Button color="primary">Sign out</Button>
    </div>
  )
}