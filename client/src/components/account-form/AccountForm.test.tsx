import React from 'react'
import { render } from '@testing-library/react'
import AccountForm from '.'

describe('AccountForm', () => {
  it('should render the AccountForm component', () => {
    const props = {}
    const {
      container,
      // debug,
    } = render(<AccountForm { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
