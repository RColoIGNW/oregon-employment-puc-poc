import { Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"

import ApprovalTable from '../../components/approval-table'
import { Layout } from "../../components/layout"
import { SEO } from "../../components/seo"
import useApplicantFormApi from '../../hooks/useApplicantFormApi'
import firebase from '../../lib/firebase'

const useSignIn = () => { // fake for demo
  useEffect(() => {
    const signInAsAdmin = (): any => {
      firebase.auth().signInWithEmailAndPassword('admin@ignw.test.com', 'Testing123!')
        .then(async () => {
          localStorage.setItem(
            'token',
            await firebase?.auth()?.currentUser?.getIdToken()
              .catch(console.error) || ''
          )
        })
        .catch(console.error)
    }
    if (!localStorage.token && typeof window !== 'undefined') {
      signInAsAdmin()
    }
    return () => {}
  })
}

const ApprovalsPage = () => {
  useSignIn()
  const [tableData, setTableData] = useState([])
  const { getUnapprovedApplications } = useApplicantFormApi()

  useEffect(() => {
    const getData = async () => {
      const data = await getUnapprovedApplications()
      setTableData(data)
    }

    if (!tableData?.length) { getData() }
    return () => {}
  })

  return (
  <Layout>
    <SEO title={'Approvals'} />
    <Grid container direction="column" spacing={3} style={{marginTop: '2em'}}>
      <Grid item>
        <ApprovalTable data={tableData}  />
      </Grid>
    </Grid>
  </Layout>
  )
}

export default ApprovalsPage
