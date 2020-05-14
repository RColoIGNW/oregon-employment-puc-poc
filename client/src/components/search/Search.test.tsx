import React from 'react'
import { render } from '@testing-library/react'
import Search from '.'

describe('Search', () => {
  it('should render the Search component', () => {
    const props = {
      onSearch: jest.fn()
    }
    const {
      container,
      // debug,
    } = render(<Search { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
