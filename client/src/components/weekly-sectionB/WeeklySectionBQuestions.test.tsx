import { render } from '@testing-library/react'
import React from 'react'

import WeeklySectionBQuestions from "./WeeklySectionBQuestions"

describe('Weekly Section B Questions', () => {
  it('should render the Weekly Section B Questions component', () => {
    const props = {} as any
    const {
      container,
      // debug,
    } = render(<WeeklySectionBQuestions {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
