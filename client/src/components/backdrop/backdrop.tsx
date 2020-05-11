import Backdrop, { BackdropProps as MuiBackdropProps } from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useContext, useState, useEffect } from 'react'

import { TransitionContext } from '../../providers/TransitionProvider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.text.primary,
    },
  }),
)

interface BackdropProps extends Omit<MuiBackdropProps, 'open'> {
  delay?: number
}

export default (props: BackdropProps) => {
  const classes = useStyles()
  const { state } = useContext(TransitionContext)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {

    if (state.open) {
      setTimeout(setIsOpen, props.delay || 0, true)
    } else {
      setIsOpen(false)
    }
  })

  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <CircularProgress color="inherit" />
      {state.message}
    </Backdrop>
  )
}
