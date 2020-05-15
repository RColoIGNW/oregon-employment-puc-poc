import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import React from "react"

import { SectionProps } from "../models/SectionProps"

export default (props: SectionProps) => {
  const content = {
    text: "I agree",
  }
  const { application, onChange } = props

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onChange({ ...application, isCertified: checked })
  }
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange({ ...application, certifiedBy: value })
  }

  return (
    <Grid container={true}>
      <Grid item={true}>
        <Grid container={true} direction="column" spacing={2}>
          <Grid item={true}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={application.isCertified || false}
                  onChange={handleChange}
                  name="certified"
                  color="primary"
                />
              }
              label={content.text}
            />
          </Grid>
          <Grid item={true}>
            <TextField
              fullWidth={true}
              label="Full Name"
              value={application.certifiedBy || ""}
              onChange={handleFullNameChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
