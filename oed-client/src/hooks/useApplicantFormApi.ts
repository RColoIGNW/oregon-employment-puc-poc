import { request } from '../util/request'
import Application from '../models/Application'

export default () => {
  const getUnapprovedApplications = () => {
    return request(`${process.env.REACT_APP_API_HOST}/api/applications`)
    .then((result: any) => {
      if (!result.success) { return [] }
      return result.response
    })
    .catch(console.error)
  }

  const createApplication = (application: Partial<Application>) => {
    // const body = JSON.stringify(formData)
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(application),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/applications`, requestOptions as any)
      .catch(console.error)
  }

  const getUserApplications = () => {
    const userId = localStorage.getItem('uid')
    return request(`${process.env.REACT_APP_API_HOST}/api/users/${userId}/applications`)
    .then((result: any) => {
      if (!result.success) { return [] }
      return result.response
    })
    .catch(console.error)
  }

  const getApplication = (applicationId: string) => {
    return request(`${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}`)
    .then((result: any) => {
      if (!result.success) { return undefined }
      return result.response
    })
    .catch(console.error)
  }

  return {
    createApplication,
    getUnapprovedApplications,
    getUserApplications,
    getApplication
  }
}
