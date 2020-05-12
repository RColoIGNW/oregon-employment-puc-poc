import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import Grid from "@material-ui/core/Grid"
import React, {useState} from "react"
import weeklyQuestions from "../../models/weeklyQuestions"
import { Button } from "@material-ui/core"
import questions from "../weekly-form/questions"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const Summary = (props: {application: weeklyQuestions}) => {
  const {application} =  props

  const rows: {name: string, value: string}[] = [
    {name: questions.failedToAcceptOffer, value: (application.failedToAcceptOffer) ? "Yes" : "No"},
    {name: questions.quitJob, value: (application.quitJob) ? "Yes" : "No"},
    {name: questions.firedOrSuspended, value: (application.firedOrSuspended) ? "Yes" : "No"},
    {name: questions.awayFromResidence, value: (application.awayFromResidence) ? "Yes" : "No"},
    {name: questions.ableToWork, value: (application.ableToWork) ? "Yes" : "No"},
    {name: questions.ableToReportToWork, value: (application.ableToReportToWork) ? "Yes" : "No"},
    {name: questions.searchedForWork, value: (application.searchedForWork) ? "Yes" : "No"},
    {name: questions.didYouWorkLastWeek, value: (application.didYouWorkLastWeek) ? "Yes" : "No"},
  ]

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
