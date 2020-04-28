import { navigate } from 'gatsby'
import React from 'react'

import { Application } from '../components/application/application'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import useApplication from '../hooks/useApplication'
import { Button } from '@material-ui/core'

const ApplicationPage = (props: any) => {
  const applicationId = props.location?.state?.applicationId
  const { submit } = useApplication()

  const handleSubmit = async () => {
    try {
      //TODO: Show Progress
      await submit(applicationId)
      navigate('application-submitted',  { state: {applicationId: applicationId }})
    } catch (e) {
      //TODO: Show submit error
    }
  }

  return (
    <Layout>
      <SEO />
      <Button onClick={handleSubmit}>TEST </Button>
      <Application applicationId={applicationId} onSubmit={handleSubmit}/>
      
    </Layout>
  )
}

export default ApplicationPage
