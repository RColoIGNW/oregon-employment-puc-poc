import { Grid } from '@material-ui/core'
import React from "react"

import ForgotPasswordForm from '../components/forgot-password-form'
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import useForgotPasswordForm from '../hooks/useForgotPassword'

const ForgotPassword = () => {
  const childProps = useForgotPasswordForm()
  return (
    <Layout>
      <SEO title={'Reset Password - Oregon Employment Department Pandemic Unemployment Assistance'} />
      <Grid container direction="row" spacing={3} style={{
        display: 'flex',
        marginTop: '2em',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <ForgotPasswordForm {...childProps} />
      </Grid>
    </Layout>
  )
}

export default ForgotPassword
