import Application from '../models/Application'
import { ApplicationStatus } from '../models/ApplicationStatus'
import { request } from '../util/request'

export default () => {
  const getUnapprovedApplications = () => {
    return request(`${process.env.REACT_APP_API_HOST}/api/applications`)
    .then((result: any) => {
      if (!result.success) { return [] }
      return result.response
    })
    .catch(console.error)
  }

  const submitApplication = (applicationId: string): Promise<any> => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({status: ApplicationStatus.Submitted}),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}/submit`, requestOptions as any)
      .catch(console.error)
  }

  const createApplication = (): Promise<any> => {
    const userId = localStorage.getItem('uid')
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({userId: userId}),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/applications`, requestOptions as any)
      .catch(console.error)
  }

  const updateApplication = (application: Partial<Application>) => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify(application),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/applications/${application.id}`, requestOptions as any)
      .catch(console.error)
  }

  const getUserApplications = (): Promise<Application[]> => {
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
    getApplication,
    createApplication,
    submitApplication,
    updateApplication,
    getUnapprovedApplications,
    getUserApplications,
  }
}
