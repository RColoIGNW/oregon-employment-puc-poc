import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { SectionProps } from '../models/SectionProps'

export default (props: SectionProps) => {
  const content = {
    text: 'I agree'
  }
  const { application, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange({ ...application, isCertified: checked })
  }
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange({ ...application, certifiedBy: value })
  }

  return (
    <Grid container>
      <Grid item>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={application.isCertified}
                  onChange={handleChange}
                  name="certified"
                  color="primary"
                />
              }
              label={content.text}
            />
          </Grid>
          <Grid item>
            <TextField fullWidth label="Full Name" value={application.certifiedBy} onChange={handleFullNameChange} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}