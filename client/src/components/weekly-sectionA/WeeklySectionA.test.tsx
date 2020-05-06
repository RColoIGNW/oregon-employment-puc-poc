import { render } from '@testing-library/react'
import React from 'react'

import WeeklySectionA from './WeeklySectionA'

describe('Weekly Section A', () => {
  it('should render the Weekly Section A component', () => {
    const props = {} as any;
    const {
      container,
      // debug,
    } = render(<WeeklySectionA {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
