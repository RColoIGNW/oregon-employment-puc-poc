import { render } from '@testing-library/react'
import { workRecordType } from "../../../models/WorkSearchRecord"
import React from 'react'

import WorkSeekingItem from "./WorkSeekingItem"
import WorkSearchRecord from "../../../models/WorkSearchRecord"

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
        type: workRecordType.seeking,
        activity: '',
      },
      onEditWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
      onDeleteWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
  }
    const {
      container,
      // debug,
    } = render(<WorkSeekingItem {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
