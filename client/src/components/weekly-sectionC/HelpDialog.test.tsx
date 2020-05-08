import { render } from '@testing-library/react'
import React from 'react'

import HelpDialog from "./HelpDialog"

describe('Help Dialog', () => {
  it('should render the Help Dialog component', () => {
    const props = {title: '',textSections: [], openFn: (open: boolean) => {console.log(open)}}
    const {
      container,
      // debug,
    } = render(<HelpDialog {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
