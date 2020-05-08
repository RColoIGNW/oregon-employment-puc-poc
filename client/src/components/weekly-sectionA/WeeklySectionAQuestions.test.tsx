import { render } from '@testing-library/react'
import React from 'react'

import WeeklySectionAQuestions from './WeeklySectionAQuestions'

describe('Weekly Section A Questions', () => {
  it('should render the Weekly Section A Questions component', () => {
    const props = {} as any;
    const {
      container,
      // debug,
    } = render(<WeeklySectionAQuestions {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
