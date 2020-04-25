import { Grid, Typography } from '@material-ui/core'
// import firebaseui from 'firebaseui'
import React, { useEffect } from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import useAuth from '../hooks/useAuth'

const LoginPage = (props) => {
  useAuth(props)

  return (
    <Layout>
      <SEO title={'Login'} />
      <Grid container direction="row" spacing={3} style={{
        display: 'flex',
        marginTop: '2em',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <Typography>
            {'To continue, log in to the Oregon Employment Department.'}
          </Typography>
        </Grid>
        <Grid item id={'firebaseui-auth-container'} />
      </Grid>
    </Layout>
  )
}

export default LoginPage
