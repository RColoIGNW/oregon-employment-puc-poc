import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import React, { useEffect, useState } from "react"
import EmploymentRecord from "../../models/EmploymentRecord"
import EmploymentRecordList from "../EmploymentRecordList"

export default (props: WeeklySectionProps) => {
  const {applicant} = props;
  const [employmentRecords, setEmploymentRecords] = useState<EmploymentRecord[]>(props.applicant.employmentHistory || [])

  const addEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    if (employmentRecord.id) {
      updateEmploymentRecord(employmentRecord)
    } else {
      employmentRecord.id = Date.now()
      setEmploymentRecords([...employmentRecords, employmentRecord])
    }
  }

  const updateEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    const index = employmentRecords.findIndex(r => r.id === employmentRecord.id)
    employmentRecords.splice(index, 1, employmentRecord)
    setEmploymentRecords([...employmentRecords])
  }

  const deleteEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    const index = employmentRecords.findIndex(r => r.id === employmentRecord.id)
    employmentRecords.splice(index, 1)
    setEmploymentRecords([...employmentRecords])
  }

  useEffect(() => {
    props.handleEmploymentChange({...applicant, employmentHistory: employmentRecords})
  }, [employmentRecords])

  return (
    <EmploymentRecordList
      isDisabled={props.isDisabled}
      employmentRecords={employmentRecords}
      onAddEmploymentRecord={addEmploymentRecord}
      onDeleteEmploymentRecord={deleteEmploymentRecord} />
  )
}
