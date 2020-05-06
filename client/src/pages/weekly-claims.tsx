import React from 'react'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import WeeklyForm from '../components/weekly-form'
import useWeeklyApplication from "../hooks/useWeeklyApplication"

const ApplicationPage = (props: any) => {
  const applicationId = props?.location?.state?.applicationId
  const childProps = useWeeklyApplication({ applicationId })
  console.log(childProps)

  return (
    <Layout>
      <SEO title={'Weekly Benefits - Oregon Pandemic Unemployment Assistance'} />
      <WeeklyForm
      {...childProps}
        applicationId={applicationId}
      />
    </Layout>
  )
}

export default ApplicationPage
