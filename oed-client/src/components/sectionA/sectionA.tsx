import React from 'react'
import ApplicantInfo from '../ApplicantInfo'
import Applicant from '../../models/Applicant'
import { SectionProps } from '../../models/SectionProps'

const SectionA = (props: SectionProps) => {
  const { application, onChange } = props

  const handleChange = (applicant: Applicant) => {
    onChange && onChange({ ...application, applicant: applicant })
  }

  return (
    <ApplicantInfo applicant={application.applicant} onChange={handleChange} isDisabled={props.isDisabled} />
  )
}

export default SectionA
