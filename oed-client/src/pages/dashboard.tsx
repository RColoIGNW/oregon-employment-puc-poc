import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import { navigate } from "gatsby"
import React from 'react'
import { uuid } from 'uuidv4'

import Alerts from '../components/alerts'
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"

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
      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    },
    list: {
      marginLeft: '5em',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: '0'
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '1em',
      minHeight: '7em',
      alignItems: 'center',
      wordWrap: 'break-word',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      }
    }
  }),
)

export default function DashboardPage() {
  const classes = useStyles()
  const menuItems = [
    {
      buttonLabel: 'File your new claim',
      description: 'Establish a new claim for Oregon unemployment benefits. If you are filing due to COVID- 19, please watch this training video.',
      link: '/application',      
    },
    {
      buttonLabel: 'Claim a Week of Benefits',
      description: 'Claim a week of unemployment benefits once your claim is established. Just like claiming by phone but easier! * Please see notes below. If you completed your New Claim this week, please wait until Sunday to Claim a Week of Benefits. If you are out of work due to COVID- 19, please read the FAQs prior to claiming a week of benefits.',
      link: '/weekly-claims'
    },
    {
      buttonLabel: 'Claim Status',
      description: 'See the status of your current weekly claim report (if claimed by Internet or phone)',
      link: '/claim-status'
    }

  ]

  return (
    <Layout>
      <SEO title={'Oregon Pandemic Unemployment Assistance'} />
      <Grid container direction="column" spacing={3} style={{ marginTop: '2em' }}>
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

        {menuItems.map(item => (
          <Paper style={{margin: '1em'}} className={classes.container}>
            <Grid item xs={12} md={2} style={{marginLeft: '1em'}}>
              <Button
                className={classes.button}
                color={'primary'}
                variant={'contained'}
                size={'large'}
                onClick={() => navigate(item.link)}
              >
                {item.buttonLabel}
              </Button>
            </Grid>
            <Grid item className={classes.list}>
              <ListItemText
                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="primary"
                    >
                      {item.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Grid>
            <Divider />
          </Paper>
        ))}

      </Grid>
    </Layout>
  )
}
