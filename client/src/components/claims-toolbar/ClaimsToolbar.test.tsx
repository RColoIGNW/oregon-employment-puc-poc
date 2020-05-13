import React from 'react'
import { render } from '@testing-library/react'
import ClaimsToolbar from '.'

describe('ClaimsToolbar', () => {
  it('should render the ClaimsToolbar component', () => {
    const props = {
      selectedAmount: 0,
      onCreate: jest.fn(),
      onEdit: jest.fn(),
      onDiscard: jest.fn(),
      onDownload: jest.fn(),
      onClearSelection: jest.fn(),
      onSearch: jest.fn()
    }
    const {
      container,
      // debug,
    } = render(<ClaimsToolbar { ...props } />)
    // debug()
    expect(container).toBeTruthy()
  })
})
