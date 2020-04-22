import React, { useEffect, useState } from 'react'

import EmploymentRecord from '../../models/EmploymentRecord'
import EmploymentRecordList from '../EmploymentRecordList'

interface SectionBProps {
  value: EmploymentRecord[],
  onChange: (employmentRecords: EmploymentRecord[]) => void
  isDisabled?: boolean
}

const SectionB = (props: SectionBProps) => {
  const [employmentRecords, setEmploymentRecords] = useState<EmploymentRecord[]>(props.value)

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
    props.onChange(employmentRecords)
  }, [employmentRecords])

  return (
    <EmploymentRecordList
      isDisabled={props.isDisabled}
      employmentRecords={employmentRecords}
      onAddEmploymentRecord={addEmploymentRecord}
      onDeleteEmploymentRecord={deleteEmploymentRecord} />
  )
}

export default SectionB
