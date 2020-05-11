import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link, navigate } from "gatsby"
import moment from 'moment'
import React, { useEffect, useState } from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import useApplicantFormApi from "../hooks/useApplicantFormApi"
import useClaimStatus from '../hooks/useClaimStatus'
import Application from '../models/Application'
import { AlertProps } from '../components/alerts/Alerts'

const GoBackToDashboard = () => (
  <Button variant={'contained'} color={'primary'} onClick={() => navigate('/dashboard')}>{`Go to Dashboard`}</Button>
)

const ClaimsStatusPage = () => {
  const apiClient = useApplicantFormApi()
  const [data, setData] = useState<Application[]>()
  const [application, setApplication] = useState<Application>()
  const { downloadApplication } = useClaimStatus()
  const [alert, setAlert] = useState<AlertProps>()

  const handleEdit = () => {
    application && navigate('application', { state: { applicationId: application.id } })
  }

  const handleDiscard = () => {
    console.log('onDiscard')
    handleClose()
  }

  const handleDownload = async () => {
    await downloadApplication(application?.id as string)
    handleClose()
  }

  const actions = [
    {
      tooltip: 'Edit',
      onClick: handleEdit
    },
    {
      tooltip: 'Discard',
      onClick: handleDiscard
    },
    {
      tooltip: 'Download',
      onClick: handleDownload
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getUserApplications()
        setData(data)
        if (!data?.length)
          setAlert({ message: 'You have not yet submitted any claims', title: 'Claim Status' })
      } catch (err) {
        setAlert({ message: 'There was an error loading your claims', title: 'Claim Status', severity: 'error' })
      }
    }
    fetchData()
  }, [])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, application: Application) => {
    setApplication(application)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setApplication(undefined)
    setAnchorEl(null)
  }

  return (
    <Layout alert={alert}>
      <SEO title={'Claim Status'} />
      <Grid container direction="row" spacing={1} style={{ marginTop: '1em' }}>
        <Grid item xs={12}>
          <GoBackToDashboard />
        </Grid>
        {data?.map((application: Application, index: number) =>
          <Grid item xs={12} sm={7} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Grid container justify="space-between" style={{ flexWrap: "nowrap" }}>
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12}>
                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bold' }}>
                          <Link to="/application" state={{ applicationId: application.id }} style={{ textDecoration: 'none' }}>
                            {application.id}
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{moment(application.dateCreated).format('MMM D, YYYY')}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="secondary" style={{ fontWeight: 'bold' }}>{application.status}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="menu" aria-controls="app-menu" aria-haspopup="true" onClick={(e) => handleClick(e, application)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
        }
      </Grid>
      <Menu
        id="app-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={action.onClick}>{action.tooltip}</MenuItem>
        ))}
      </Menu>
    </Layout>
  )
}

export default ClaimsStatusPage
