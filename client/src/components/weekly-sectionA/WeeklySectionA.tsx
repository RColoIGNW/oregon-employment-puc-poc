import React from 'react'
import WeeklyStep1 from "./WeeklyStep1"
import { WeeklySectionProps } from "../../models/WeeklySectionProps"



const WeeklySectionA = (props: WeeklySectionProps) => {

  return (
    <WeeklyStep1 {...props}/>
  )
}

export default WeeklySectionA

