import React from 'react'
import { WeeklySectionProps } from '../../models/WeeklySectionProps'


import WeeklyStep2 from "./WeeklyStep2"
import weeklyQuestions from "../../models/weeklyQuestions"

const WeeklySectionB = (props: WeeklySectionProps) => {
  const { application, onChange } = props

  const handleChange = (weeklyQuestions: weeklyQuestions) => {
    //todo not sure what should go here
    onChange && onChange({ ...application })
  }

  return (
    <WeeklyStep2 onChangeWeekly={handleChange} application={props.application} onChange={props.onChange} isDisabled={props.isDisabled}/>
  )
}

export default WeeklySectionB

