import { render } from '@testing-library/react'
import React from 'react'

import App from './index'

describe('App', () => {
  xit('should render the app', () => {
    const props = {} as any
    const {
      container,
      // debug,
    } = render(<App { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
