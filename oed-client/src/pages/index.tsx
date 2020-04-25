import { Grid, Typography } from '@material-ui/core'
// import firebaseui from 'firebaseui'
import React, { useEffect } from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import firebase from '../lib/firebase'
import firebaseui from '../lib/firebaseUI'

const LoginPage = (props) => {
  if (typeof window !== 'undefined') {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase?.auth()) as any || {}
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM, // Change to NONE
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      // signInSuccessUrl: typeof window !== 'undefined' && `${window.location.host}`,
      signInSuccessUrl: `${props.location.origin}/dashboard`,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>',
      // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>'
    };
    useEffect(() => {
      ui.start('#firebaseui-auth-container', uiConfig)

      firebase.auth().getRedirectResult().then((result: any) => {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          localStorage.accessToken = token
        }
      })
    })
  }

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
