import { navigate } from 'gatsby'
import React from 'react'

import { Application } from '../components/application/application'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import useApplication from '../hooks/useApplication'

const ApplicationPage = (props: any) => {
  const applicationId = props.location?.state?.applicationId
  const { submit } = useApplication({ applicationId })

  const handleSubmit = async (appId: string) => {
    try {
      //TODO: Show Progress
      await submit(appId)
      navigate('application-submitted',  { state: {applicationId: applicationId }})
    } catch (e) {
      //TODO: Show submit error
    }
  }

  return (
    <Layout>
      <SEO />
      <Application applicationId={applicationId} onSubmit={handleSubmit}/>
    </Layout>
  )
}

export default ApplicationPage
