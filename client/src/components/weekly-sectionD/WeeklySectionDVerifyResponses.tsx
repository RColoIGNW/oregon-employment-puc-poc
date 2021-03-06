import { Button, Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import dayjs from "dayjs"
import React, { useState } from "react"

import weeklyQuestions from "../../models/weeklyQuestions"
import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import Alerts from "../alerts"
import questions from "../weekly-form/questions"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const counts = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
]

const formatDate = () => {
  const today = new Date()
  const todayDateAndTime =
    today.getMonth() +
    1 +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes())
  const previousSaturdayMonth =
    today.getDate() - today.getDay() > 0
      ? monthNames[today.getMonth()]
      : monthNames[today.getMonth() - 1]
  const previousSaturdayDate = today.getDate() - today.getDay()
  return (
    "Date: " +
    todayDateAndTime +
    " for the week ending at midnight on Saturday, " +
    previousSaturdayMonth +
    " " +
    previousSaturdayDate +
    ", " +
    today.getFullYear() +
    "."
  )
}

const Summary = (props: { application: weeklyQuestions }) => {
  const { application } = props
  let seekingCount = -1
  let searchCount = -1

  const rows: { name: string, value: string }[] = [
    {
      name: questions.failedToAcceptOffer,
      value: application.failedToAcceptOffer ? "Yes" : "No",
    },
    { name: questions.quitJob, value: application.quitJob ? "Yes" : "No" },
    {
      name: questions.firedOrSuspended,
      value: application.firedOrSuspended ? "Yes" : "No",
    },
    {
      name: questions.awayFromResidence,
      value: application.awayFromResidence ? "Yes" : "No",
    },
    {
      name: questions.ableToWork,
      value: application.ableToWork ? "Yes" : "No",
    },
    {
      name: questions.ableToReportToWork,
      value: application.ableToReportToWork ? "Yes" : "No",
    },
    {
      name: questions.searchedForWork,
      value: application.searchedForWork ? "Yes" : "No",
    },
    {
      name: questions.didYouWorkLastWeek,
      value: application.didYouWorkLastWeek ? "Yes" : "No",
    },
  ]

  return (
    <TableContainer component={Paper}>
      <Table aria-label="question response table" style={{ width: "100%" }}>
        <TableBody style={{ width: "100%" }}>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={2}
              style={{ backgroundColor: "#D3D3D3" }}
            >
              Work Search Records
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      {application.workSearchRecords.map((record) => {
        if (record.type == "searching") {
          const workRows: { name: string, value: string }[] = [
            { name: "Date", value: dayjs(record.date).format("MMM. DD, YYYY") },
            { name: "Company Name", value: String(record.employer) },
            { name: "Location", value: String(record.location) },
            { name: "Contact Method", value: String(record.contactMethod) },
            { name: "Type of Work", value: String(record.typeOfWorkSought) },
            { name: "Result", value: String(record.result) },
          ]
          searchCount += 1

          return (
            <Table
              aria-label="question response table"
              style={{ width: "100%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={2}
                    style={{ backgroundColor: "#FFFACD" }}
                  >
                    {counts[searchCount]}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        } else {
          return null
        }
      })}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={2}
              style={{ backgroundColor: "#D3D3D3" }}
            >
              Work Seeking Activity Records
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      {application.workSearchRecords.map((record) => {
        if (record.type == "seeking") {
          const workRows: { name: string, value: string }[] = [
            { name: "Date", value: dayjs(record.date).format("MMM. DD, YYYY") },
            { name: "Activity", value: String(record.activity) },
          ]
          seekingCount += 1

          return (
            <Table
              aria-label="question response table"
              style={{ width: "100%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={2}
                    style={{ backgroundColor: "#FFFACD" }}
                  >
                    {counts[seekingCount]}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        } else {
          return null
        }
      })}
    </TableContainer>
  )
}

export default (props: WeeklySectionProps) => {
  const application = props.application

  const [showSummary, setShowSummary] = useState(false)

  return (
    <Grid container={true} spacing={2} direction={"column"}>
      <Grid style={{ paddingTop: 20, paddingBottom: 10 }}>
        <Alerts
          isOpen={true}
          severity={"success"}
          message={
            <div>
              <Typography style={{ fontWeight: 600 }} align={"center"}>
                {" "}
                {questions.submitClaim}{" "}
              </Typography>
              <Typography align={"center"}>
                {" "}
                {questions.clickViewSummary}{" "}
              </Typography>
            </div>
          }
        />
        <Grid style={{ padding: 20 }}>
          <Typography> {formatDate()} </Typography>
          <Typography> Ref: {application.applicationId} </Typography>
        </Grid>
      </Grid>
      <Grid style={{ paddingTop: 10 }}>
        {!showSummary && (
          <Button onClick={() => setShowSummary(true)} variant={"outlined"}>
            View Summary
          </Button>
        )}
      </Grid>
      {showSummary && (
        <Grid container={true} direction={"column"}>
          <Grid item={true}>
            <Summary application={application} />
          </Grid>
          <Grid item={true} alignContent={"center"} style={{ paddingTop: 10 }}>
            <Button onClick={() => setShowSummary(false)} variant={"outlined"}>
              Close Summary
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
