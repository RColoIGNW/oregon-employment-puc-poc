import { Grid } from "@material-ui/core"
import React from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import SignUpForm from "../components/sign-up-form"
import useSignUpForm from "../hooks/useRegistration"

const SignUpPage = () => {
  const childProps = useSignUpForm()
  return (
    <Layout>
      <SEO
        title={
          "Sign Up - Oregon Employment Department Pandemic Unemployment Assistance"
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
        <SignUpForm {...childProps} />
      </Grid>
    </Layout>
  )
}

export default SignUpPage
