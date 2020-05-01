import React from 'react'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import Button from "@material-ui/core/Button"
import { navigate } from "gatsby"

const pageInfo = {
  successMessage: 'Your application has been successfully submitted. Here is your application ID',
  button: 'Return to the dashboard'
}

const ApplicationSubmittedPage = (props: any) => {
  const applicationId = props.location?.state?.applicationId

  return (
    <Layout>
      <SEO title={'Application Submitted'} />
      <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={4} style={{marginTop: 24}}>
        <Grid item>
          <Typography variant={'h4'}>
            {pageInfo.successMessage}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={'h4'}>
            {applicationId}
          </Typography>
        </Grid>
        <Grid item>
          <Button color={'primary'} variant={'contained'} size={'large'} onClick={() => navigate('dashboard')}>
            {pageInfo.button}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default  ApplicationSubmittedPage
