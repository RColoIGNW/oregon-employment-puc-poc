import React, { useEffect, useState } from "react"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"

interface EmploymentRecordEditProps {
  openFn: (open: boolean) => void,
  title: string,
  textSections: string[]
}


export default (props: EmploymentRecordEditProps) => {
  const [open, setOpen] = useState(true)
  const {openFn} = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    openFn(open)
  }, [open])

  return (
      <Dialog fullScreen={fullScreen} open={open} onClose={() => {setOpen(false)}}>
        <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers={true}>
          <List component="nav" aria-label="main mailbox folders">
            {
            props.textSections.map((textSection) => {
              return (
                  <ListItem>
                    <ListItemText primary={textSection}/>
                  </ListItem>
                )
            })
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} onClick={() => {setOpen(false)}}>Ok</Button>
        </DialogActions>
      </Dialog>
  )
}
