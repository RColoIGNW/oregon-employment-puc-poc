import { useEffect } from 'react'

import firebase from '../lib/firebase'
import firebaseui from '../lib/firebaseUI'

export default (props) => {
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
      credentialHelper: firebaseui.auth.CredentialHelper.NONE, // Change to NONE
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
      privacyPolicyUrl: 'https://www.oregon.gov/pages/terms-and-conditions.aspx'
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
}
