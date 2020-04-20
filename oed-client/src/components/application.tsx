import React from 'react'
import Divider from '@material-ui/core/Divider'

import Employer from '../models/Employer'
import EmploymentRecord from '../models/EmploymentRecord'
import EmploymentRecordList from './EmploymentRecordList'
import { Address } from '../models/Address'
import Applicant from '../models/Applicant'
import { Race } from '../models/Race'
import ApplicantInfo from './ApplicantInfo'
import Container from '@material-ui/core/Container'
import moment from 'moment'

const address: Address = { street: '123 Main St', city: 'Great City', state: 'FL', zipCode: '12345' }

const applicant: Applicant = {
  firstName: 'John',
  middleName: 'W.',
  lastName: 'Smith',
  ssn: '123456789',
  dob: moment().add(-14, "years").toDate(),
  address: address,
  phone: '1234567890',
  gender: undefined,
  isHispanicLatino: undefined,
  contactMethod: undefined,
  races: [Race.White, Race.Other]
}

const employer: Employer = {
  name: 'Employer 1',
  address: address,
  phone: '1234567890'
}

const employmentRecord: EmploymentRecord = {
  employer,
  started: new Date('2010-01-01'),
  ended: new Date('2012-01-01')
}

const employmentRecords: EmploymentRecord[] = [
  employmentRecord, employmentRecord, employmentRecord, employmentRecord, employmentRecord
]

export default () => {
  return (
      <Container>
        <ApplicantInfo applicant={applicant} />
        <br />
        <Divider />
        <br />
        <EmploymentRecordList employmentRecords={employmentRecords} />
      </Container>
  )
}
