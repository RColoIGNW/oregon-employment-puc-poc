import { render } from '@testing-library/react'
import React from 'react'

import WeeklyStep1 from './WeeklyStep1'

describe('Weekly Step 1', () => {
  it('should render the Weekly Step 1 component', () => {
    const props = {} as any;
    const {
      container,
      // debug,
    } = render(<WeeklyStep1 {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
