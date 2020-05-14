import { render } from '@testing-library/react'
import React from 'react'

import WorkSearchItem from "./WorkSearchItem"
import WorkSearchRecord, { workRecordType } from "../../../models/WorkSearchRecord"

describe('Work Search Item', () => {
  it('should render the Work Search Item component', () => {
    const props = {
      workSearchRecord: {
        employer: 'string',
        date: new Date(),
        location: 'string',
        contactMethod: 'string',
        typeOfWorkSought: 'string',
        result: 'string',
        type: workRecordType.searching,
        activity: ''
      },
      onEditWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
      onDeleteWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
  }
    const {
      container,
      // debug,
    } = render(<WorkSearchItem {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
