import { Grid, Typography } from '@material-ui/core'
import React from 'react'

import Dropzone from '../dropzone'

const pageInfo = {
  text: 'Upload Documents',
}


const SectionF = (props: { application: { id: string } }) => {
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'body2'}>
          {pageInfo.text}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction={'column'}>
          <Grid item>
            <Dropzone applicationId={props?.application?.id} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SectionF
