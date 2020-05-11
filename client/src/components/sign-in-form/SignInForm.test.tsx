import { render } from '@testing-library/react'
import React from 'react'

import SignInForm from '.'

describe('SignInForm', () => {
  it('should render the SignInForm component', () => {
    const props = {} as any
    const {
      container,
      // debug,
    } = render(<SignInForm { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
