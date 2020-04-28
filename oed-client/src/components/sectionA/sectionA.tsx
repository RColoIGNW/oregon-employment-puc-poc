import React, { useState} from 'react'
import ApplicantInfo from '../ApplicantInfo'
import Applicant from '../../models/Applicant'
import { SectionProps } from '../../models/SectionProps'

const SectionA = (props: SectionProps) => {    
  const [application, setApplication] = useState(props.application)  
  
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
    <ApplicantInfo applicant={application.applicant} onChange={handleChange} isDisabled={props.isDisabled}/>
  )
}

export default SectionA
