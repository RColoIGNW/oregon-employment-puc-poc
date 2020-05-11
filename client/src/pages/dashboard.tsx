import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { navigate } from 'gatsby'
import React from 'react'

import Alerts from '../components/alerts'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    button: {
      width: '15em',
      [theme.breakpoints.down('xs')]: {
        width: '10em'
      }
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
  }),
)

export default function DashboardPage() {
  const classes = useStyles()
  //const api = useApplicantFormApi()

  // const handleNewApplication = async () => {
  //   try {
  //     const result = await api.createApplication() as any
  //     navigate('application', {state: {applicationId: result.applicationId}})
  //   } catch (e) {

  //   }
  // }
  const handleNavigate = (link: string) => navigate(link)

  const menuItems = [
    {
      buttonLabel: 'File your new claim',
      description: 'Establish a new claim for Oregon unemployment benefits. If you are filing due to COVID- 19, please watch this training video.',
      link: '/application',
      handleClick: handleNavigate
    },
    {
      buttonLabel: 'Claim a Week of Benefits',
      description: 'Claim a week of unemployment benefits once your claim is established. Just like claiming by phone but easier! * Please see notes below. If you completed your New Claim this week, please wait until Sunday to Claim a Week of Benefits. If you are out of work due to COVID- 19, please read the FAQs prior to claiming a week of benefits.',
      link: '/weekly-claims',
      handleClick: handleNavigate
    },
    {
      buttonLabel: 'Claim Status',
      description: 'See the status of your current weekly claim report (if claimed by Internet or phone)',
      link: '/claim-status',
      handleClick: handleNavigate
    }
  ]

  return (
    <Layout>
      <SEO title={'Oregon Pandemic Unemployment Assistance'} />
      <Grid container direction={'column'} spacing={3} style={{ marginTop: '2em' }}>
        <Grid item>
          <Alerts
            isOpen={true}
            variant={'outlined'}
            severity={'info'}
            message={'Have questions about filing your unemployment insurance claim and potential benefits? Please review our COVID-19 page for information, including frequently asked questions and video tutorials. If you still have questions please send a detailed message to UI Help and we will respond as soon as possible.'}
          />
        </Grid>

        <Grid item style={{ justifyContent: 'center', display: 'flex'}}>
          <Typography variant={'h4'} color={'primary'}>
            Welcome to your online claim system
          </Typography>
        </Grid>

        <Paper style={{margin: '1em'}}>
          {menuItems.map((item, index) => (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <Grid item className={classes.row}>
                  <Grid item style={{display: 'flex'}}>
                    <Button
                      className={classes.button}
                      color={'primary'}
                      variant={'contained'}
                      size={'medium'}
                      fullWidth
                      onClick={() => item.handleClick(item.link)}
                    >
                      {item.buttonLabel}
                    </Button>
                  </Grid>
                  <Grid item style={{right: 0, display: 'flex'}}>
                    <Typography color={'primary'}>
                      More details
                    </Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {item.description}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Paper>
      </Grid>
    </Layout>
  )
}
