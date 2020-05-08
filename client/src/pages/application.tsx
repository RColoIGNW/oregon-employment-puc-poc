import React from 'react'

import { Application } from '../components/application/application'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'

const ApplicationPage = (props: any) => {
  const applicationId = props.location?.state?.applicationId

  return (
    <Layout>
      <SEO />
      <Application applicationId={applicationId} />
    </Layout>
  )
}

export default ApplicationPage
