import { render } from '@testing-library/react'
import React from 'react'

import WorkSeekingList from "./WorkSeekingList"
import WorkSearchRecord from "../../../models/WorkSearchRecord"

describe('Work Search List', () => {
  it('should render the Work Search List component', () => {
    const props = {
      workSearchRecords: [{
        employer: 'string',
        date: new Date(),
        location: 'string',
        contactMethod: 'string',
        typeOfWorkSought: 'string',
        result: 'string',
        type: 'searching',
        activity: '',
      }],
      onAddWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
      onDeleteWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
    }
    const {
      container,
      // debug,
    } = render(<WorkSeekingList {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
