import { Grid } from "@material-ui/core"
import React from "react"

import AccountForm from "../components/account-form"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import useAccountForm from "../hooks/useAccountForm"

const AccountPage = () => {
  const childProps = useAccountForm()
  return (
    <Layout>
      <SEO
        title={
          "Account - Oregon Employment Department Pandemic Unemployment Assistance"
        }
      />
      <Grid
        container={true}
        direction="row"
        spacing={3}
        style={{
          display: "flex",
          marginTop: "2em",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <AccountForm {...childProps} />
      </Grid>
    </Layout>
  )
}

export default AccountPage
