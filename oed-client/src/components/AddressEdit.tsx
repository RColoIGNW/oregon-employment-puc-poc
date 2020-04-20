import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Address } from '../models/Address'

const validate = (name: string, value: string): string => {
  switch (name) {
    case 'street':
      if (!value.trim()) return 'Enter your street address'
      break
    case 'city':
      if (!value.trim()) return 'Enter your city'
      break
    default: return ''
  }
  return ''
}

const defaultValue: Address = {
  street: '',
  city: '',
  state: '',
  zipCode: ''
}

interface AddressEditProps {
  address?: Address
  onCompletion?: (address: Address) => void
}

type AddressEditErrors = {
  [k in keyof Address]: string
}

export default (props: AddressEditProps) => {
  const address = props.address || defaultValue
  const errors: AddressEditErrors = {} as AddressEditErrors
  const [state, setState] = useState({ value: address, errors: errors })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    console.log({ name, value })
    setState({ value: { ...state.value, [name]: value }, errors: { ...state.errors, [name]: validate(name, value) } })
    props.onCompletion && props.onCompletion(state.value)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="street"
          value={state.value.street}
          onChange={onChange}
          error={!!state.errors.street}
          helperText={state.errors.street}
          label="Street or P.O."
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <TextField
          name="city"
          value={state.value.city}
          onChange={onChange}
          error={!!state.errors.city}
          helperText={state.errors.city}
          label="City"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          name="state"
          value={state.value.state}
          onChange={onChange}
          error={!!state.errors.state}
          helperText={state.errors.state}
          label="State"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          name="zipCode"
          value={state.value.zipCode}
          onChange={onChange}
          error={!!state.errors.zipCode}
          helperText={state.errors.zipCode}
          label="State"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  )
}