import { render } from '@testing-library/react'
import React from 'react'

import ApplicationPage from './application'

describe('Application', () => {
  it('should render the application page', () => {
    const props = {} as any
    const {
      container,
      // debug,
    } = render(<ApplicationPage { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
