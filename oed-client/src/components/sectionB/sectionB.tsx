import React, { useState } from 'react'
import EmploymentRecordList from '../EmploymentRecordList'
import EmploymentRecord from '../../models/EmploymentRecord'

const SectionB = () => {
  const [employmentRecords, setEmploymentRecords] = useState<EmploymentRecord[]>([])
  const addEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    employmentRecord.id = Date.now()
    setEmploymentRecords([...employmentRecords, employmentRecord])
  }
  const deleteEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    const index = employmentRecords.findIndex(r => r.id === employmentRecord.id)
    employmentRecords.splice(index, 1)
    setEmploymentRecords([...employmentRecords])
  }

  return (
    <EmploymentRecordList
      employmentRecords={employmentRecords}
      onAddEmploymentRecord={addEmploymentRecord}
      onDeleteEmploymentRecord={deleteEmploymentRecord} />
  )
}

export default SectionB