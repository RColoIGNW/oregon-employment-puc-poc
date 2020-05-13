import React from 'react'
import { render } from '@testing-library/react'
import Search from '.'

describe('Search', () => {
  it('should render the Search component', () => {
    const props = {}
    const {
      container,
      // debug,
    } = render(<Search { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
