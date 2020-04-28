import { Grid } from '@material-ui/core'
import React from "react"

import AdminNoteDialog from '../../components/admin-note-dialog'
import ApprovalTable from '../../components/approval-table'
import { Layout } from "../../components/layout"
import { SEO } from "../../components/seo"
import useApprovals from '../../hooks/useApprovals'

const ApprovalsPage = () => {
  const { tableData, isModalOpen, toggleModal } = useApprovals()
  return (
  <Layout>
    <SEO title={'Approvals'} />
    <Grid container direction="column" spacing={3} style={{marginTop: '2em'}}>
      <Grid item>
        <ApprovalTable data={tableData} toggleModal={toggleModal}  />
      </Grid>
    </Grid>
    <AdminNoteDialog open={!!isModalOpen} onCancel={() => toggleModal(false)} onSave={console.log} />
  </Layout>
  )
}

export default ApprovalsPage
