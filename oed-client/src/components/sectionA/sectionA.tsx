import React from 'react'

import Applicant from '../../models/Applicant'
import ApplicantInfo from '../ApplicantInfo'

interface SectionAProps {
  value: Applicant
  onChange: (applicant: Applicant) => void
  isDisabled?: boolean
}

const SectionA = (props: SectionAProps) => {
  const { onChange, value: applicant, isDisabled } = props
  return (
    <ApplicantInfo {...{isDisabled, applicant, onChange}} />
  )
}

export default SectionA
