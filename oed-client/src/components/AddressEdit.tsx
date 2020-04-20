import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

export default () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><TextField fullWidth id="applicant-info-address-street" label="Street or P.O." variant="outlined" /></Grid>
      <Grid item xs={5}><TextField fullWidth id="applicant-info-address-city" label="City" variant="outlined" /></Grid>
      <Grid item xs={3}><TextField fullWidth id="applicant-info-address-state" label="State" variant="outlined" /></Grid>
      <Grid item xs={4}><TextField fullWidth id="applicant-info-address-zipCode" label="Zip Code" variant="outlined" /></Grid>
    </Grid>
  )
}