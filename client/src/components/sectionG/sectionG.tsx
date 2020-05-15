import { Grid, Typography } from "@material-ui/core"
import React from "react"

import Application from "../../models/Application"
import Dropzone from "../dropzone"

const pageInfo = {
  text: "Upload Documents",
}

interface SectionFProps {
  application: Application
}

const SectionF = (props: SectionFProps) => {
  return (
    <Grid container={true} direction={"column"} spacing={2}>
      <Grid item={true}>
        <Typography variant={"body2"}>{pageInfo.text}</Typography>
      </Grid>
      <Grid item={true}>
        <Grid container={true} direction={"column"}>
          <Grid item={true}>
            <Dropzone applicationId={props?.application?.id} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SectionF
