import path from 'path'

import { Bigtable } from '@google-cloud/bigtable'

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../../sa.json')

const bigtable = new Bigtable()

interface InsertRowOptions {
  tableId: string
  instanceId: string
  rowId: string
  callback: () => any
  date: Date|string
  data: any
}

export async function insertRow(options: InsertRowOptions) {
  const instance = bigtable.instance(options.instanceId)
  const table = instance.table(options.tableId)

  // const timestamp = new Date().toUTCString()
  const row = table.row(options.rowId) // date#some-datepk#some-datefk
  const filter = [
    {
      column: 'cf1',
      value: options.date
    },
  ]

  const config = {
    onMatch: [
      {
        method: 'insert',
        data: options.data,
      },
    ],
  }

  row.filter(filter, config, options.callback)
  // const rowsToInsert = options.data.map((row: any) => ({
  //   key: options.rowId,
  //   data: row
  // }))

  // table.insert(rowsToInsert, undefined, options.callback)

  console.info(`Successfully updated row ${options.rowId}`)
}

/* test */
insertRow({
  tableId: 'pua-claims',
  instanceId: 'pua-claims-instance',
  rowId: 'date#today#tomorrow',
  callback: console.info,
  date: new Date().toString(),
  data: {
    application: {},
    id: 'id',
  }
  // data: [{ family: '123' }]
})

export default insertRow
