import { Grid } from "@material-ui/core"
import React from "react"

import AdminNoteDialog from "../../components/admin-note-dialog"
import ApprovalTable from "../../components/approval-table"
import { Layout } from "../../components/layout"
import { SEO } from "../../components/seo"
import useApprovals from "../../hooks/useApprovals"

const ApprovalsPage = () => {
  const {
    tableData,
    isModalOpen,
    toggleModal,
    openModal,
    adminNote,
    handleChange,
    handleSubmit,
    setAdminNote,
  } = useApprovals()
  return (
    <Layout>
      <SEO title={"Approvals"} />
      <Grid
        container={true}
        direction="column"
        spacing={3}
        style={{ marginTop: "2em" }}
      >
        <Grid item={true}>
          <ApprovalTable
            data={tableData}
            openModal={openModal}
            setAdminNote={setAdminNote}
          />
        </Grid>
      </Grid>
      <AdminNoteDialog
        open={!!isModalOpen}
        handleChange={handleChange}
        adminNote={adminNote}
        onCancel={() => toggleModal(false)}
        onSave={handleSubmit}
      />
    </Layout>
  )
}

export default ApprovalsPage
