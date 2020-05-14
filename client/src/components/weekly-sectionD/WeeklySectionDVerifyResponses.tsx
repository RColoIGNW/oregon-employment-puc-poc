import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import Grid from "@material-ui/core/Grid"
import React, {useState} from "react"
import weeklyQuestions from "../../models/weeklyQuestions"
import { Button, Typography } from "@material-ui/core"
import questions from "../weekly-form/questions"


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import dayjs from "dayjs"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatDate = () => {
  const today = new Date()
  let todayDateAndTime = (today.getMonth() + 1) + '/' + (today.getDate()) + '/' + today.getFullYear() + ' ' + today.getHours() + ':' +
    (today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes())
  let previousSaturdayMonth = today.getDate() - today.getDay() > 0 ? monthNames[today.getMonth()] : monthNames[today.getMonth() -1]
  let previousSaturdayDate = today.getDate() - today.getDay()
  return 'Date: ' + todayDateAndTime + ' for the week ending at midnight on Saturday, ' + previousSaturdayMonth + ' '
    + previousSaturdayDate + ', ' +  today.getFullYear() + '.'
}

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
      <Table aria-label="question response table" style={{width: '100%'}}>
        <TableBody style={{width: '100%'}}>
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
          {application.workSearchRecords.map((record) => {
            if (record.type == 'searching') {
              const workRows: {name: string, value: string}[] = [
                {name: "Date", value: dayjs(record.date).format('MMM. DD, YYYY')},
                {name: "Company Name", value: String(record.employer)},
                {name: "Location", value: String(record.location)},
                {name: "Contact Method", value: String(record.contactMethod)},
                {name: "Type of Work", value: String(record.typeOfWorkSought)},
                {name: "Result", value: String(record.result)},
              ]

              return (
                <Table aria-label="question response table" style={{width: '100%'}}>
                  <TableBody style={{width: '100%'}}>
                    <TableHead>
                      <TableCell align="right" colSpan={6}>

                      </TableCell>
                    </TableHead>
                    {workRows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            }
            else { return null }
          })}
      {application.workSearchRecords.map((record) => {
        if (record.type == 'seeking') {
          const workRows: {name: string, value: string}[] = [
            {name: "Date", value: dayjs(record.date).format('MMM. DD, YYYY')},
            {name: "Activity", value: String(record.activity)},
          ]

          return (
            <Table aria-label="question response table" style={{width: '100%'}}>
              <TableBody style={{width: '100%'}}>
                <TableHead>
                  <TableCell align="right" colSpan={6}>

                  </TableCell>
                </TableHead>
                {workRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        }
        else { return null }
      })}
    </TableContainer>
  )
}

export default (props: WeeklySectionProps) => {
  const application = props.application

  const [showSummary, setShowSummary] = useState(false)

  return (
    <Grid container spacing={2} direction={'column'}>
      <Grid style={{paddingTop: 20, paddingBottom: 10}}>
        <Typography style={{fontWeight: 600}} align={'center'}> {questions.submitClaim} </Typography>
        <Typography align={'center'}> {questions.clickViewSummary} </Typography>
        <hr/>
        <Typography> {formatDate()} </Typography>
        <Typography> Ref: {application.applicationId} </Typography>
      </Grid>
      <Grid style={{paddingTop: 10}}>
        {!showSummary && <Button onClick={() => setShowSummary(true)} variant={'outlined'}>View Summary</Button>}
      </Grid>
      {showSummary &&
        <Grid container>
          <Grid item>
            <Summary application={application}/>
          </Grid>
          <Grid item alignContent={'center'} style={{paddingTop: 10}}>
            <Button onClick={() => setShowSummary(false)} variant={'outlined'}>Close Summary</Button>
          </Grid>
        </Grid>
      }


    </Grid>
    )
}
