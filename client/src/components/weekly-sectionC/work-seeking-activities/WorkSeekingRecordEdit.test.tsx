import { render } from '@testing-library/react'
import React from 'react'

import WorkSeekingRecordEdit from "./WorkSeekingRecordEdit"

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
        type: "searching",
        activity: '',
      },
      open: true,
    }
    const {
      container,
      // debug,
    } = render(<WorkSeekingRecordEdit {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
