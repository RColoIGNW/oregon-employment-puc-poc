import { render } from '@testing-library/react'
import React from 'react'

import WeeklyForm from './WeeklyForm'

describe('Weekly Form', () => {
  it('should render the Weekly Form page', () => {
    const props = {} as any;
    const {
      container,
      // debug,
    } = render(<WeeklyForm {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
