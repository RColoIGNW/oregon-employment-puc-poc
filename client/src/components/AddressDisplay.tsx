import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React from "react"

import Address from "../models/Address"

interface AddressDisplayProps {
  address: Address
}

export default (props: AddressDisplayProps) => {
  const { street, city, state, zipCode } = props.address
  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography style={{ textTransform: "uppercase" }}>{street}</Typography>
      </Grid>
      <Grid item={true}>
        <Typography
          style={{ textTransform: "uppercase" }}
        >{`${city} ${state}  ${zipCode}`}</Typography>
      </Grid>
    </Grid>
  )
}
