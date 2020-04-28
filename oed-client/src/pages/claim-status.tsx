import React, { useEffect, useState } from "react"
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import { navigate, Link } from "gatsby"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import useApplicantFormApi from "../hooks/useApplicantFormApi"
import Application from '../models/Application'

const ClaimsStatusPage = () => {
  const apiClient = useApplicantFormApi()
  const [data, setData] = useState<Application[]>()
  const [application, setApplication] = useState<Application>()

  const handleEdit = () => {
    application && navigate('application', { state: { applicationId: application.id } })
  }

  const handleDiscard = () => {
    console.log('onDiscard')
    handleClose()
  }

  const handleDownload = () => {
    console.log('onDownload')
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
      const data = await apiClient.getUserApplications()
      setData(data)
    }
    fetchData()
  }, [])


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, application: Application) => {
    setApplication(application)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setApplication(undefined)
    setAnchorEl(null);
  };

  if (!data) return (<div>Loading...</div>)

  return (
    <Layout>
      <SEO title={'Dashboard'} />
      <Grid container direction="row" spacing={1} style={{ marginTop: '1em' }}>
        {data.map((application: Application, index: number) =>
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
                        <Typography variant="body1">{moment().format('MMM D, YYYY')}</Typography>
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
        )}
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
