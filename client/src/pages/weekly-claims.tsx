import { navigate } from 'gatsby'
import React from 'react'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import WeeklyForm from '../components/weekly-form'
import useWeeklyApplication from "../hooks/useWeeklyApplication"

const ApplicationPage = (props: any) => {
  const applicationId = props?.location?.state?.applicationId
  const {submit, currentValue, handleChange, handleEmploymentChange, save} = useWeeklyApplication()

  const handleSubmit = async (appId: string) => {
    try {
      //TODO: Show Progress
      const {currentValue} = useWeeklyApplication()
      currentValue.applicationId = appId
      console.log('current value')
      console.log(currentValue)

      await submit(currentValue)
      navigate('confirm',  { state: {applicationId: appId }})
    } catch (e) {
      //TODO: Show submit error
    }
  }

  return (
    <Layout>
      <SEO title={'Weekly Benefits - Oregon Pandemic Unemployment Assistance'} />
      <WeeklyForm applicationId={applicationId} onSubmit={handleSubmit} currentValue={currentValue}
                  handleChange={handleChange} handleEmploymentChange={handleEmploymentChange} save={save}/>
    </Layout>
  )
}

export default ApplicationPage
