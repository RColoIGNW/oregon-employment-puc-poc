import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { navigate } from "gatsby"
import React from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import useApi from "../hooks/useClaimStatus"

const pageInfo = {
  successMessage:
    "Your application has been successfully submitted. Here is your application ID",
  button: "View your applications",
  downloadButton: "Download Form",
}

const ApplicationSubmittedPage = (props: any) => {
  const applicationId = props.location?.state?.applicationId
  const { download } = useApi()

  return (
    <Layout>
      <SEO title={"Application Submitted"} />
      <Grid
        container={true}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
        spacing={4}
        style={{ marginTop: 24 }}
      >
        <Grid item={true}>
          <Typography variant={"h4"}>{pageInfo.successMessage}</Typography>
        </Grid>
        <Grid item={true}>
          <Typography variant={"h4"}>{applicationId}</Typography>
        </Grid>
        <Grid item={true}>
          <Button
            color={"primary"}
            variant={"contained"}
            size={"large"}
            onClick={() => download(applicationId)}
            data-testid={"download-application-button"}
          >
            {pageInfo.downloadButton}
          </Button>
        </Grid>
        <Grid item={true}>
          <Button
            color={"primary"}
            variant={"contained"}
            size={"large"}
            onClick={() => navigate("claim-status")}
            data-testid={"view-claims-button"}
          >
            {pageInfo.button}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ApplicationSubmittedPage
