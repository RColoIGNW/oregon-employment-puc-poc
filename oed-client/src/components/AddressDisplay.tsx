import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Address } from '../models/Address'

interface AddressDisplayProps {
  address: Address
}

export default (props: AddressDisplayProps) => {
  const { street, city, state, zipCode } = props.address
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography style={{ textTransform: "uppercase" }}>{street}</Typography>
      </Grid>
      <Grid item>
        <Typography style={{ textTransform: "uppercase" }}>{`${city} ${state}  ${zipCode}`}</Typography>
      </Grid>
    </Grid>
  )
}