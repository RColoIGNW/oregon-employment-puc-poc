import React, { useEffect, useState } from "react"

import EmploymentRecord from "../../models/EmploymentRecord"
import { SectionProps } from "../../models/SectionProps"
import EmploymentRecordList from "../EmploymentRecordList"

const SectionB = (props: SectionProps) => {
  const [employmentRecords, setEmploymentRecords] = useState<
    EmploymentRecord[]
  >(props.application.employmentRecords || [])

  const addEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    if (employmentRecord.id) {
      updateEmploymentRecord(employmentRecord)
    } else {
      employmentRecord.id = Date.now()
      setEmploymentRecords([...employmentRecords, employmentRecord])
    }
  }

  const updateEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    const index = employmentRecords.findIndex(
      (r) => r.id === employmentRecord.id
    )
    employmentRecords.splice(index, 1, employmentRecord)
    setEmploymentRecords([...employmentRecords])
  }

  const deleteEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    const index = employmentRecords.findIndex(
      (r) => r.id === employmentRecord.id
    )
    employmentRecords.splice(index, 1)
    setEmploymentRecords([...employmentRecords])
  }

  useEffect(() => {
    props.onChange({
      ...props.application,
      employmentRecords,
    })
  }, [employmentRecords])

  return (
    <EmploymentRecordList
      isDisabled={props.isDisabled}
      employmentRecords={employmentRecords}
      onAddEmploymentRecord={addEmploymentRecord}
      onDeleteEmploymentRecord={deleteEmploymentRecord}
    />
  )
}

export default SectionB
