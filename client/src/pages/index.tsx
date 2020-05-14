import { Divider, Grid, Typography } from '@material-ui/core'
import { navigate } from 'gatsby'
import React from "react"
import { useTranslation } from 'react-i18next'

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import SignInForm from '../components/sign-in-form'
import useAuthUI from '../hooks/useAuthUI'
import useSignInForm from '../hooks/useSignIn'

const LoginPage = (props: { location: { origin: string, pathname: string } }) => {
  const { isSignedIn } = useAuthUI(props)
  const childProps = useSignInForm()
  const { t } = useTranslation()

  if (!!isSignedIn) {
    navigate('/dashboard')
    return <>{t('login.redirecting')}</>
  }

  return (
    <Layout>
      <SEO title={t('login.title')} />
      <Grid container direction="row" spacing={3} style={{
        display: 'flex',
        marginTop: '2em',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography color={'primary'}>
            {t('login.message')}
          </Typography>
        </Grid>
        <SignInForm {...childProps} />
        <Divider style={{ width: '100%', marginTop: '2em' }} />
        <Grid item style={{ marginBottom: '-1em' }}>
          <Typography color={'primary'} variant={'subtitle2'}>{t('login.or')}</Typography>
        </Grid>
        <Grid item id={'firebaseui-auth-container'} />
      </Grid>
    </Layout>
  )
}

export default LoginPage
