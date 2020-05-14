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
import { useTranslation } from "react-i18next"

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
  const {t} = useTranslation()
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
      buttonLabel: t('dashboard.newClaim'),
      description: t('dashboard.newClaimDescription'),
      link: '/application',
      handleClick: handleNavigate,
      e2e: 'new-claim-link'
    },
    {
      buttonLabel: t('dashboard.weekClaim'),
      description: t('dashboard.weekClaimDescription'),
      link: '/ui-review',
      handleClick: handleNavigate,
      e2e: 'weekly-claim-link'
    },
    {
      buttonLabel: t('dashboard.claimStatus'),
      description: t('dashboard.claimStatusDescription'),
      link: '/claim-status',
      handleClick: handleNavigate,
      e2e: 'view-claims-link'
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
            message={t('dashboard.alert')}
          />
        </Grid>

        <Grid item style={{ justifyContent: 'center', display: 'flex'}}>
          <Typography variant={'h4'} color={'primary'}>
            {t('dashboard.title')}
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
                      data-testid={item.e2e}
                    >
                      {item.buttonLabel}
                    </Button>
                  </Grid>
                  <Grid item style={{right: 0, display: 'flex'}}>
                    <Typography color={'primary'}>
                      {t('dashboard.moreDetails')}
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
