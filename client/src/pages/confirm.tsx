import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import Button from "@material-ui/core/Button"
import { navigate } from "gatsby"
import { Paper } from "@material-ui/core"
import Alerts from "../components/alerts"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const previousSaturdayDate = () => {
  let today = new Date()
  let previousSaturdayMonth = today.getDate() - today.getDay() > 0 ? monthNames[today.getMonth()] : monthNames[today.getMonth() -1]
  let previousSaturdayDate = today.getDate() - today.getDay()
  return previousSaturdayMonth + ' ' + previousSaturdayDate + ', ' +  today.getFullYear() + '.'
}

const pageInfo = {
  submitted: "Weekly Claim Completed",
  successMessage: 'This certifies your claim for the last seven day calendar week, ending at midnight on Saturday ' ,
  button: 'Return to the dashboard',
  survey: "Would you like to provide feedback about your experience by responding to a brief survey?"
}

const ApplicationSubmittedPage = () => {
  const [survey, setSurvey] = useState(true);
  const [popup, setPopup] = useState(false);

  return (
    <Layout>
      <SEO title={'Application Submitted'} />
      <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={4} style={{marginTop: 24}}>
        <Grid item>
          { popup ? <Alerts severity={'info'} isOpen={true} message={'survey coming soon!'}/> : null}
          <Typography variant={'h4'} align={'center'}>
            {pageInfo.submitted}
          </Typography>
          <Grid style={{padding:  15}}>
            <Typography variant={'body1'} align={'center'}>
              Thank you.
            </Typography>
            <Typography variant={'body1'} align={'center'}>
              {pageInfo.successMessage} {previousSaturdayDate()}
            </Typography>
          </Grid>
        </Grid>
        {survey ?
          <Paper style={{padding: 20, backgroundColor: '#FFFACD'}} elevation={0}>
            <Grid container spacing={2} direction={'column'} alignItems={'center'}>
              <Typography variant={'body1'} align={'center'}>
                {pageInfo.survey}
              </Typography>
              <Grid item>
                <Button style={{width: 100}} color={'primary'} variant={'contained'} size={'large'} onClick={() => setPopup(true)}>
                  Yes
                </Button>
              </Grid>
              <Grid item>
                <Button style={{width: 100}} color={'primary'} variant={'contained'} size={'large'} onClick={() => setSurvey(false)}>
                  No
                </Button>
              </Grid>
            </Grid>
          </Paper>
          :
          null
        }
        <Grid item>
          <Button color={'primary'} variant={'contained'} size={'large'} onClick={() => {navigate('dashboard')}}>
            {pageInfo.button}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default  ApplicationSubmittedPage
