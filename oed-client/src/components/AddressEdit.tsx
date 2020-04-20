import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Address } from '../models/Address'

interface AddressEditProps {
  address: Address
}

export default (props: AddressEditProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField error fullWidth helperText="adfasdfa" id="applicant-info-address-street" label="Street or P.O." variant="outlined" />
      </Grid>
      <Grid item xs={12} md={5}>
        <TextField fullWidth id="applicant-info-address-city" label="City" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField fullWidth id="applicant-info-address-state" label="State" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth id="applicant-info-address-zipCode" label="Zip Code" variant="outlined" />
      </Grid>
    </Grid>
  )
}