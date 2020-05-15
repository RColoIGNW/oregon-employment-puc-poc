import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import Fade from "@material-ui/core/Fade"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import React, { useContext } from "react"

import { TransitionContext } from "../../providers/TransitionProvider"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.text.primary,
    },
  })
)

export default () => {
  const classes = useStyles()
  const { state } = useContext(TransitionContext)

  return (
    <Fade
      in={state?.open}
      style={{ transitionDelay: state?.open ? "500ms" : "0ms" }}
      unmountOnExit={true}
    >
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
        {state?.message}
      </Backdrop>
    </Fade>
  )
}
