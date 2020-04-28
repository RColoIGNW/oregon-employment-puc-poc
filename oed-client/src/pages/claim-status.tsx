import Grid from '@material-ui/core/Grid'
import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import Download from '@material-ui/icons/GetApp'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { navigate } from "gatsby"
import MaterialTable from 'material-table'
import React, { forwardRef, useEffect, useState } from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import useApplicantFormApi from "../hooks/useApplicantFormApi"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props as any} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props as any} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props as any} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props as any} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props as any} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props as any} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props as any} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props as any} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props as any} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props as any} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props as any} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props as any} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props as any} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props as any} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props as any} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props as any} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props as any} ref={ref} />)
}

interface TableAction {
  icon: any,
  tooltip: string,
  onClick: (event: any, rowData: any) => void
}

interface ApplicationsTableProps {
  columns: {title: string, field: string}[],
  data: any[],
  actions: TableAction[]
}

const ApplicationsTable = (props: ApplicationsTableProps) => {
  const {columns, data, actions} = props

  return (
    <MaterialTable
      title="Unapproved Applications"
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
      }}
      icons={tableIcons as any}
      actions={actions}
    />
  )
}

const ClaimsStatusPage = () => {
  const apiClient = useApplicantFormApi()
  const [data, setData] = useState([])
  const columns = [
    { title: 'Date Applied', field: 'date' },
    { title: 'Name', field: 'applicant.firstName' },
    { title: 'Phone', field: 'applicant.phone' },
    { title: 'SSN', field: 'applicant.ssn' },
    { title: 'Approval Status', field: 'status' },
  ]

  const handleEdit = (_: any, rowData: any) => {
    navigate('application', { state: {applicationId: rowData.id }})
  }

  const handleDiscard = (_: any, rowData: any) => {
    console.log('onDiscard')
  }

  const handleDownload = (_: any, rowData: any) => {
    console.log('onDownload')
  }

  const actions = [
    {
      icon: Edit as any,
      tooltip: 'Edit',
      onClick: handleEdit
    },
    {
      icon: DeleteOutline as any,
      tooltip: 'Discard',
      onClick: handleDiscard
    },
    {
      icon: Download as any,
      tooltip: 'Download',
      onClick: handleDownload
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiClient.getUserApplications()
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <SEO title={'Dashboard'} />
      <Grid container direction="column" spacing={3} style={{marginTop: '1em'}}>
        <Grid item>
          <ApplicationsTable columns={columns} data={data} actions={actions} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ClaimsStatusPage
