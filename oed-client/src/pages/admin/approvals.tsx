import { Grid } from '@material-ui/core'
import React from "react"

import ApprovalTable from '../../components/approval-table'
import { Layout } from "../../components/layout"
import { SEO } from "../../components/seo"
import useApprovals from '../../hooks/useApprovals'

const ApprovalsPage = () => {
  const { tableData } = useApprovals()

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
