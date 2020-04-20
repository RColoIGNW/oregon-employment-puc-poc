import React, { useState } from 'react'
import EmploymentRecordList from '../EmploymentRecordList'
import EmploymentRecord from '../../models/EmploymentRecord'

const SectionB = () => {
  const [employmentRecords, setEmploymentRecords] = useState<EmploymentRecord[]>([])
  const addEmploymentRecord = (employmentRecord: EmploymentRecord) => {
    setEmploymentRecords([...employmentRecords, employmentRecord])
  }

  return (
    <EmploymentRecordList employmentRecords={employmentRecords} onAddEmploymentRecord={addEmploymentRecord} />
  )
}

export default SectionB