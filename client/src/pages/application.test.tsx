import { render } from '@testing-library/react'
import React from 'react'

import ApplicationPage from './application'

describe('App', () => {
  xit('should render the app', () => {
    const props = {} as any
    const {
      container,
      // debug,
    } = render(<ApplicationPage { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
