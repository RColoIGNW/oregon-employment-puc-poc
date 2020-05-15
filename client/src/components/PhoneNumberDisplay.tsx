import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import PhoneIcon from "@material-ui/icons/Phone"
import React from "react"

interface PhoneNumberPropsDisplay {
  phoneNumber: string
}

export default (props: PhoneNumberPropsDisplay) => {
  const { phoneNumber } = props
  const cleaned = phoneNumber.replace(/\D/g, "")
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    const intlCode = match[1] ? "+1 " : ""
    return (
      <Grid container={true} alignItems="center" justify="center">
        <Grid item={true}>
          <IconButton href="tel:{phoneNumber}" color="primary">
            <PhoneIcon />
          </IconButton>
        </Grid>
        <Grid
          item={true}
        >{`${intlCode}(${match[2]}) ${match[3]}-${match[4]}`}</Grid>
      </Grid>
    )
  }
  return null
}
