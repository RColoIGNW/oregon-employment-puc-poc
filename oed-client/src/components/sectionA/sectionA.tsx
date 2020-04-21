import React from 'react'
import ApplicantInfo from '../ApplicantInfo'
import Applicant from '../../models/Applicant'

interface SectionAProps {
  value: Applicant
  onChange: (applicant: Applicant) => void
}

const SectionA = (props: SectionAProps) => {
  const { onChange, value: applicant } = props
  return (
    <ApplicantInfo applicant={applicant} onChange={onChange} />
  )
}

export default SectionA