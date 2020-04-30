import React from 'react'
import { WeeklySectionProps } from '../../models/WeeklySectionProps'
import WeeklyStep1 from "./WeeklyStep1"
import weeklyQuestions from "../../models/weeklyQuestions"

const WeeklySectionA = (props: WeeklySectionProps) => {
  const { weeklyQuestions, onChangeWeekly } = props

  const handleChange = (weeklyQuestions: weeklyQuestions) => {
                                                    //todo not sure what should go here
    onChangeWeekly && onChangeWeekly({ ...weeklyQuestions })
  }

  return (
    <WeeklyStep1 onChange={handleChange} isDisabled={props.isDisabled}/>
  )
}

export default WeeklySectionA

