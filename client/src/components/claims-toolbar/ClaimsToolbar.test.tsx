import React from 'react'
import { render } from '@testing-library/react'
import ClaimsToolbar from '.'

describe('ClaimsToolbar', () => {
  it('should render the ClaimsToolbar component', () => {
    const props = {}
    const {
      container,
      // debug,
    } = render(<ClaimsToolbar { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
