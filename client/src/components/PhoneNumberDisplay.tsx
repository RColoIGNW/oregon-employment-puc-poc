import React from 'react'
import PhoneIcon from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

interface PhoneNumberPropsDisplay {
  phoneNumber: string
}

export default (props: PhoneNumberPropsDisplay) => {
  const { phoneNumber } = props
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <IconButton href="tel:{phoneNumber}" color="primary"><PhoneIcon /></IconButton>
        </Grid>
        <Grid item>
          {`${intlCode}(${match[2]}) ${match[3]}-${match[4]}`}
        </Grid>
      </Grid>
    )
  }
  return null
}
