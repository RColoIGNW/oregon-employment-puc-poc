import React from "react"

import Applicant from "../../models/Applicant"
import { SectionProps } from "../../models/SectionProps"
import ApplicantInfo from "../ApplicantInfo"

const SectionA = (props: SectionProps) => {
  const { application, onChange } = props

  const handleChange = (applicant: Applicant) => {
    onChange && onChange({ ...application, applicant })
  }

  return (
    <ApplicantInfo
      applicant={application.applicant}
      onChange={handleChange}
      isDisabled={props.isDisabled}
    />
  )
}

export default SectionA
