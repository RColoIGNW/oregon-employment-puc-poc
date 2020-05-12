import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import Grid from "@material-ui/core/Grid"
import React, {useState} from "react"
import weeklyQuestions from "../../models/weeklyQuestions"
import { Button } from "@material-ui/core"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Summary = (props: {application: weeklyQuestions}) => {

  const rows: {name: string, value: string}[] = []

  Object.keys(props.application).forEach((key) => {
    // @ts-ignore
    if(typeof props.application[key] == 'boolean') {rows.push({name: key, value: String(props.application[key])})}
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default (props: WeeklySectionProps) => {
  const application = props.application

  const [showSummary, setShowSummary] = useState(false)

  return (
    <Grid container spacing={2}>

      {!showSummary && <Button onClick={() => setShowSummary(true)}>View Summary</Button>}
      {showSummary &&
        <Grid>
          <Summary application={application}/>
          <Button onClick={() => setShowSummary(false)}>Close Summary</Button>
        </Grid>
      }


    </Grid>
    )
}
