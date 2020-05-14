import React, {useState} from 'react'
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { navigate } from "gatsby"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"


const pageInfo = {
  title: "Introducing the UI Basics Review",
  uiBasicsReview: "To help you better understand what to report on your weekly unemployment claim, we will be offering the UI Basics Review.",
  expandedReview: "To help you better understand what to report on your weekly unemployment claim, we will be offering the UI Basics Review. At the time that you file a weekly claim for unemployment benefits, you will be notified if you have been chosen for the review. You will be asked six questions and then notified of the correct responses.",
  questions: "The questions are designed to help you understand how to report earnings, work separations, and other important information on your unemployment claim. After you have completed your review, you will automatically be taken to the weekly claim screen so you can claim a week of benefits. You may be asked to complete the review up to three times during the course of your claim.",
  click: "Click continue to claim a week of benefits."
}

const ApplicationSubmittedPage = () => {
  const [readMore, setReadMore] = useState(false);


  return (
    <Layout>
      <Grid item>
        <SEO title={'Application Submitted'} />
        <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={4} style={{marginTop: 24}}>
          <Typography variant={'h5'}>{pageInfo.title}</Typography>
          <Grid style={{width: '90%'}}>
            {!readMore && <Typography>{pageInfo.uiBasicsReview}</Typography>}
            {readMore &&
            <Grid>
              <Typography style={{paddingTop: 10, paddingBottom: 10}}>{pageInfo.expandedReview}</Typography>
              <Typography>{pageInfo.questions}</Typography>
            </Grid>
            }
          </Grid>
          <Grid style={{paddingTop: 10, paddingBottom: 10}}>
            {!readMore && <Button variant={'contained'} size={'large'} onClick={() => setReadMore(true)}>
              Read more
            </Button>}
            {readMore && <Button variant={'contained'} size={'large'} onClick={() => setReadMore(false)}>
              Read less
            </Button>}
          </Grid>
          <Grid>
            <Typography>{pageInfo.click}</Typography>
          </Grid>
          <Grid style={{marginTop: 10}}>
            <Button style={{width: 200, backgroundColor: '#075a17', color: '#FFFFFF'}} variant={'contained'} size={'large'} onClick={() => {navigate('weekly-claims')}}>
              Continue
            </Button>
          </Grid>
          <Grid style={{marginTop: 20}}>
            <Button style={{width: 200}} color={'primary'} variant={'contained'} size={'large'} onClick={() => {navigate('dashboard')}}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default  ApplicationSubmittedPage
