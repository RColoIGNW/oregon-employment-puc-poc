import React from 'react'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { navigate } from 'gatsby'
import { Application } from '../components/application/application'

const ApplicationPage = (props: any) => {
  
  const { applicationId } = props.location?.state
  console.log(props.location)
  
  const handleSubmit = () => {    
    navigate('confirm')  
  }
  
  return (
    <Layout>
      <SEO />
      <Application applicationId={applicationId} onSubmit={handleSubmit}/>
    </Layout>
  )
}

export default ApplicationPage
