import { render } from '@testing-library/react'
import React from 'react'

import WeeklySectionC from "./WeeklySectionC"
import weeklyQuestions from "../../models/weeklyQuestions"

describe('Weekly Section C', () => {
  it('should render the Weekly Section C component', () => {
    const props = {
      application: {
        failedToAcceptOffer: true,
        quitJob: true,
        firedOrSuspended: true,
        ableToWork: true,
        awayFromResidence: true,
        veteran: true,
        temporaryUnemployment: true,
      },
      handleChange: (x: weeklyQuestions) => {console.log(x)},
      handleWorkSearchChange: (x: weeklyQuestions) => {console.log(x)},
    }
    const {
      container,
      // debug,
    } = render(<WeeklySectionC {...props}/>)
    // debug()
    expect(container).toBeTruthy()
  })
})
