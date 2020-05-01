import React from 'react'
import { WeeklySectionProps } from '../../models/WeeklySectionProps'
import WeeklyStep2 from "./WeeklyStep2"
import weeklyQuestions from "../../models/weeklyQuestions"
import WeeklyStep1 from "../weekly-sectionA/WeeklyStep1"

const WeeklySectionB = (props: WeeklySectionProps) => {
  const { weeklyQuestions, onChangeWeekly } = props

  const handleChange = (weeklyQuestions: weeklyQuestions) => {
                                    //todo not sure what should go here
    onChangeWeekly && onChangeWeekly({ ...weeklyQuestions })
  }

  return (
    <WeeklyStep2 onChange={handleChange} isDisabled={props.isDisabled}/>
  )
}

export default WeeklySectionB

