import React from 'react'
import WeeklyStep1 from "./WeeklyStep1"
import weeklyQuestions from "../../models/weeklyQuestions"
import ApplicationModel from "../../models/Application"

interface WeeklyFormProps {
  applicationId?: string
  onSubmit?: (appId: string) => Promise<any>
  isDisabled?: boolean,
  currentValue: Partial<weeklyQuestions>,
  handleChange: (weeklyApplication: Partial<weeklyQuestions>) => null,
  handleEmploymentChange: (employmentRecords: ApplicationModel) => null,
  save: (application: Partial<weeklyQuestions>) => Promise<string>,
  localSave: (weeklyApplication:  weeklyQuestions) => null
}

const WeeklySectionA = (props: WeeklyFormProps) => {

  return (
    <WeeklyStep1 {...props}/>
  )
}

export default WeeklySectionA

