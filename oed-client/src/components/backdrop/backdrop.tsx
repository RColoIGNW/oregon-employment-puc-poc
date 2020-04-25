import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

import { TransitionContext } from '../../providers/TransitionProvider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)

export default (props: { forceOpen?: boolean }) => {
  const classes = useStyles()

  return (
    <TransitionContext.Consumer>
      {(value: { state: { open: boolean, message: string } }) => {
        const { open, message } = value.state || {}
        return (
          <Backdrop className={classes.backdrop} open={!!props.forceOpen || !!open}>
            <CircularProgress color="inherit" />
            {message}
          </Backdrop>
        )
      }}
    </TransitionContext.Consumer>
  )
}
