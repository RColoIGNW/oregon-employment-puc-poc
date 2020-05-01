import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import React from 'react'

import Address from '../models/Address'
import ZipCodeTextField from './ZipCodeTextField'
import StateSelect from './StateSelect'

const defaultValue: Address = {
  street: '',
  city: '',
  state: '',
  zipCode: ''
}

interface AddressEditProps {
  address?: Address
  onChange: (address: Address) => void
  isDisabled?: boolean
}

export default (props: AddressEditProps) => {
  const address = props.address || defaultValue
  const disabled = !!props.isDisabled

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    props.onChange({...address, [name]: value })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="street"
          value={address.street}
          onChange={onChange}
          disabled={disabled}
          label="Street or P.O."
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <TextField
          name="city"
          value={address.city}
          onChange={onChange}
          disabled={disabled}
          label="City"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <StateSelect
          name="state"
          value={address.state}
          onChange={onChange}
          disabled={disabled}
          label="State"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <ZipCodeTextField
          name="zipCode"
          value={address.zipCode}
          onChange={onChange}
          disabled={disabled}
          label="Zip Code"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  )
}
