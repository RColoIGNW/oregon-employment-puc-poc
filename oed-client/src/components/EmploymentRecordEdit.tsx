import React, { useState } from 'react'
import EmploymentRecord from '../models/EmploymentRecord'
import TextField from '@material-ui/core/TextField'

interface EmploymentRecordEditProps {
  employmentRecord?: EmploymentRecord
}

export default (props: EmploymentRecordEditProps) => {
  const [employer, setEmployer] = useState(props.employmentRecord?.employer)
  const [started, setStarted] = useState(props.employmentRecord?.started)
  const [ended, setEnded] = useState(props.employmentRecord?.ended)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setEmployer({ ...employer, name: event.target.value })
  }

  return (
    <TextField id="employer-name" label="Name of Employer" variant="outlined" onChange={onNameChange} />
  )
}