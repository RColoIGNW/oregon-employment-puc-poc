import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import React, { useEffect, useState } from "react"
import WorkSearchRecord from "../../models/WorkSearchRecord"
import WorkSearchList from "./WorkSearchList"

export default (props: WeeklySectionProps) => {
  const {application} = props;
  const [workSearchRecords, setWorkSearchRecords] = useState<WorkSearchRecord[]>(props.application.workSearchRecords || [])

  const addWorkSearchRecord = (workSearchRecord: WorkSearchRecord) => {
    if (workSearchRecord.id) {
      updateEmploymentRecord(workSearchRecord)
    } else {
      workSearchRecord.id = Date.now()
      setWorkSearchRecords([...workSearchRecords, workSearchRecord])
    }
  }

  const updateEmploymentRecord = (workSearchRecord: WorkSearchRecord) => {
    const index = workSearchRecords.findIndex(r => r.id === workSearchRecord.id)
    workSearchRecords.splice(index, 1, workSearchRecord)
    setWorkSearchRecords([...workSearchRecords])
  }

  const deleteEmploymentRecord = (workSearchRecord: WorkSearchRecord) => {
    const index = workSearchRecords.findIndex(r => r.id === workSearchRecord.id)
    workSearchRecords.splice(index, 1)
    setWorkSearchRecords([...workSearchRecords])
  }

  useEffect(() => {
    props.handleWorkSearchChange({...application, workSearchRecords: workSearchRecords})
  }, [workSearchRecords])

  return (
    <WorkSearchList
      isDisabled={props.isDisabled}
      workSearchRecords={workSearchRecords}
      onAddWorkSearchRecord={addWorkSearchRecord}
      onDeleteWorkSearchRecord={deleteEmploymentRecord} />
  )
}
