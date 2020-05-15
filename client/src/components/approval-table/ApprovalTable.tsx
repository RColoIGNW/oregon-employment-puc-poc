import AddBox from "@material-ui/icons/AddBox"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import Block from "@material-ui/icons/Block"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import MaterialTable, { Column } from "material-table"
import moment from "moment"
import React, { forwardRef } from "react"

import useApplicantFormApi from "../../hooks/useApplicantFormApi"
import ApplicationModel from "../../models/Application"
import { Application } from "../application/application"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...(props as any)} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...(props as any)} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...(props as any)} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...(props as any)} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...(props as any)} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...(props as any)} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...(props as any)} ref={ref} />),
  Filter: forwardRef((props, ref) => (
    <FilterList {...(props as any)} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage {...(props as any)} ref={ref} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage {...(props as any)} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight {...(props as any)} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...(props as any)} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear {...(props as any)} ref={ref} />
  )),
  Search: forwardRef((props, ref) => <Search {...(props as any)} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ArrowUpward {...(props as any)} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove {...(props as any)} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumn {...(props as any)} ref={ref} />
  )),
}

interface Row {
  name: string
  date: string
  phone: string
  status: string
}

interface TableState {
  columns: Column<Row>[]
  data: Row[]
}

const getDateTime = (application: ApplicationModel | any) => {
  // Temp solution until all data in normalized for the firestore timestamp conversion
  const dateTimeString = `${application?.lastModified?.seconds}${application?.lastModified?.nanoseconds}`
  const lastModified = application?.lastModified?.seconds
    ? Number(dateTimeString.substring(0, dateTimeString.length - 6))
    : application.lastModified
  const date = new Date(lastModified as Date)
  return date
}

export default function ApprovalTable(props: any) {
  const { updateApplication } = useApplicantFormApi()
  const tableProps: TableState = {
    columns: [
      { title: "Date Applied", field: "date", defaultSort: "asc" },
      { title: "Name", field: "name" },
      { title: "Phone", field: "phone" },
      { title: "SSN", field: "ssn" },
      { title: "Approval Status", field: "status" },
    ],
    data: props?.data?.map((application: ApplicationModel) => {
      const date = getDateTime(application)
      return {
        ...application,
        id: application.id,
        name: `${application.applicant?.firstName ?? ""} ${
          application.applicant?.middleName ?? ""
        } ${application.applicant?.lastName ?? ""}`,
        date: moment(date).format("LLL"),
        phone: application.applicant?.phone,
        ssn: application.applicant?.ssn,
        status: application.status || "In Progress",
      }
    }),
  }

  return (
    <MaterialTable
      title="Unapproved Applications"
      columns={tableProps.columns}
      data={tableProps.data}
      options={{
        actionsColumnIndex: -1,
        rowStyle: {
          flexWrap: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
      icons={tableIcons as any}
      actions={[
        {
          icon: Edit as any,
          tooltip: "Admin Note",
          onClick: (_: any, rowData: any) => props.openModal(rowData),
        },
        {
          icon: Block as any,
          tooltip: "Decline",
          onClick: (_: any, rowData: any) => {
            updateApplication({ ...rowData, status: "Deny" })
          },
        },
        {
          icon: Check as any,
          tooltip: "Approve",
          onClick: (_: any, rowData: any) => {
            updateApplication({ ...rowData, status: "Approved" })
          },
        },
      ]}
      detailPanel={(rowData: any) => {
        return <Application isDisabled={true} applicationId={rowData.id} />
      }}
    />
  )
}
