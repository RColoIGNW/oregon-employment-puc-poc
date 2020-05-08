import { render } from '@testing-library/react'
import React from 'react'

import WorkSearchList from "./WorkSearchList"
import WorkSearchRecord from "../../models/WorkSearchRecord"

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
        unionMember: true,
        tempLayoff: true,
      }],
      onAddWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
      onDeleteWorkSearchRecord: (workSearchRecord: WorkSearchRecord) => {console.log(workSearchRecord)},
    }
    const {
      container,
      // debug,
    } = render(<WorkSearchList {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
