import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Block from '@material-ui/icons/Block'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import MaterialTable, { Column } from 'material-table'
import React from 'react'
import { forwardRef } from 'react'

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

interface Row {
  name: string
  date: string
  phone: string
  status: string
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[]
}

export default function MaterialTableDemo() {
  const [state] = React.useState<TableState>({
    columns: [
      { title: 'Date Applied', field: 'date' },
      { title: 'Name', field: 'name' },
      { title: 'Phone', field: 'phone' },
      {
        title: 'Approval Status',
        field: 'status',
      },
    ],
    data: [
      { name: 'Mehmet', date: '01-01-2016', phone: '5032201234', status: 'pending' },
      {
        name: 'Zerya Betül',
        date: '04-24-2020',
        phone: '5035554444',
        status: 'pending',
      },
    ],
  })

  return (
    <MaterialTable
      title="Unapproved Applications"
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1,
      }}
      icons={tableIcons as any}
      actions={[
        {
          icon: Block as any,
          tooltip: 'Decline',
          onClick: (_: any, rowData: any) => alert("You declined " + rowData.name)
        },
        {
          icon: Check as any,
          tooltip: 'Approve',
          onClick: (_: any, rowData: any) => alert("You approved " + rowData.name)
        }
      ]}
    />
  )
}
