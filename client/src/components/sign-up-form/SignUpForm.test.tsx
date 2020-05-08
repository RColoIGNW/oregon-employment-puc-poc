import { render } from '@testing-library/react'
import React from 'react'

import SignUpForm from '.'

describe('SignUpForm', () => {
  it('should render the SignUpForm component', () => {
    const props = {} as any
    const {
      container,
      // debug,
    } = render(<SignUpForm { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
