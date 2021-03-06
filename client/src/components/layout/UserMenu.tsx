import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonIcon from "@material-ui/icons/Person"
import { navigate } from "gatsby"
import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import { AuthContext } from "../../providers/AuthProvider"

export const UserMenu = () => {
  const { signOut, user } = useContext(AuthContext)
  const { t } = useTranslation()
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

  const handleAccountClick = () => navigate("/account")

  return (
    <>
      <Button
        endIcon={<AccountCircle />}
        onClick={handleMenu}
        color="inherit"
        data-testid={"account-menu-icon"}
      >
        {user?.displayName}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted={true}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAccountClick}>
          {t("userMenu.profile")}
        </MenuItem>
        <MenuItem
          onClick={handleAccountClick}
          data-testid={"account-menu-item"}
        >
          {t("userMenu.account")}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>{t("userMenu.signOut")}</MenuItem>
      </Menu>
    </>
  )
}

export const UserMenuMobile = () => {
  const { signOut, user } = useContext(AuthContext)
  const { t } = useTranslation()

  return (
    <Grid container={true} alignItems="center">
      <Grid item={true}>
        <PersonIcon style={{ fontSize: 68 }} />
      </Grid>
      <Grid item={true}>{user?.displayName}</Grid>
      <Grid item={true} xs={12}>
        <Grid container={true} justify="space-between">
          <Grid item={true}>
            <Button
              color="primary"
              onClick={() => navigate("/account")}
              data-testid={"nav-profile-item"}
            >
              {t("userMenu.profile")}
            </Button>
          </Grid>
          <Grid item={true}>
            <Button
              color="primary"
              onClick={signOut}
              endIcon={<ExitToAppIcon />}
            >
              {t("userMenu.signOut")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
