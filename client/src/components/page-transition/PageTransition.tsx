import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)

export default (props: { open?: boolean, content?: string|React.ReactNode }) => {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={!!props.open}>
      <CircularProgress color="inherit" />
      {props.content}
    </Backdrop>
  )
}
