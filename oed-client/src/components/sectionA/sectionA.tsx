import React, { useState, useEffect } from 'react'
import ApplicantInfo from '../ApplicantInfo'
import Applicant from '../../models/Applicant'
import { SectionProps } from '../../models/SectionProps'

const SectionA = (props: SectionProps) => {    
  const [application, setApplication] = useState(props.application)  
  console.log(props.application)
  
  const handleChange = (applicant: Applicant) => {
    setApplication({...application, applicant: applicant})
    props.onChange && props.onChange(application)
  }

  // useEffect(() => {
  //   console.log('UE')
  //   console.log(application)
  //   props.onChange(application)
  // }, [application])

  return (
    <ApplicantInfo {...{isDisabled: props.isDisabled, applicant: application.applicant, onChange:handleChange}} />
  )
}

export default SectionA
