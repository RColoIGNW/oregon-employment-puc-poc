import { render } from '@testing-library/react'
import React from 'react'

import AccountForm from '.'

describe('AccountForm', () => {
  it('should render the AccountForm component', () => {
    const props = {} as any
    const {
      container,
      // debug,
    } = render(<AccountForm { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
