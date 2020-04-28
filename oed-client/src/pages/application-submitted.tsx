import React from 'react'
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { navigate } from "gatsby"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"

const pageInfo = {
  successMessage: '',
  button: 'View application status'  
}

const ApplicationSubmittedPage = (props: any) => {  
  const applicationId = props.location?.state?.applicationId
  
  return (
    <Layout>
      <SEO title={'Application Submitted'} />
      <Grid container direction="column">
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
          <Button color={'primary'} variant={'contained'} size={'large'} onClick={() => navigate('claim-status')}>
            {pageInfo.button}
          </Button>
        </Grid>        
      </Grid>
    </Layout>
  )
}

export default  ApplicationSubmittedPage 
