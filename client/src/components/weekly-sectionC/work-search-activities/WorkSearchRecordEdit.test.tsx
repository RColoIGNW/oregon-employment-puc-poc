import { render } from '@testing-library/react'
import { workRecordType } from "../../../models/WorkSearchRecord"
import React from 'react'

import WorkSearchRecordEdit from "./WorkSearchRecordEdit"

describe('Work Search Record Edit', () => {
  it('should render the Work Search Record Edit component', () => {
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
      open: true,
    }
    const {
      container,
      // debug,
    } = render(<WorkSearchRecordEdit {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
