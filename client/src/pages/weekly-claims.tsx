import { navigate } from 'gatsby'
import React from 'react'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import WeeklyForm from '../components/weekly-form'

const ApplicationPage = (props: any) => {
  const applicationId = props?.location?.state?.applicationId

  const handleSubmit = () => {
    navigate('confirm')
  }

  return (
    <Layout>
      <SEO title={'Weekly Benefits - Oregon Pandemic Unemployment Assistance'} />
      <WeeklyForm applicationId={applicationId} onSubmit={handleSubmit} />
    </Layout>
  )
}

export default ApplicationPage
