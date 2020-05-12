import { render } from '@testing-library/react'
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
        unionMember: true,
        tempLayoff: true,
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
