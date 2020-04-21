import { Grid, Theme, createStyles, makeStyles } from "@material-ui/core"
import React, { useEffect } from "react"

import ApprovalTable from '../../components/approval-table'
import { Layout } from "../../components/layout"
import { SEO } from "../../components/seo"
import firebase from '../../lib/firebase'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appStepper: {
      padding: theme.spacing(1),
    }
  }),
)

const useSignIn = () => { // fake for demo
  useEffect(() => {
    const signInAsAdmin = (): any => {
      if (!localStorage.token && typeof window !== 'undefined') {
        firebase.auth().signInWithEmailAndPassword('admin@ignw.test.com', 'Testing123!')
          .then(async () => {
            localStorage.setItem('token', await firebase?.auth()?.currentUser?.getIdToken().catch(console.error) || '')
          })
          .catch(console.error)
      }
    }
    signInAsAdmin()
    return () => {}
  })
}

const InitialApplicationPage = () => {
  useSignIn()
  // const classes = useStyles()

  return (
  <Layout>
    <SEO title={'Approvals'} />
    <Grid container direction="column" spacing={3} style={{marginTop: '2em'}}>
      <Grid item>
        <ApprovalTable />
      </Grid>
    </Grid>
  </Layout>
  )
}

export default InitialApplicationPage
