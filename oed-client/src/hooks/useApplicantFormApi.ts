import Application from '../models/Application'
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

  const submitApplication = (application: Application): Promise<string> => {
    return saveApplication({...application, status: ApplicationStatus.Submitted})
  }

  const saveApplication = async (application: Partial<Application>): Promise<string> => {
    let applicationId: string =  application.id || ''

    if (applicationId) {
      await updateApplication(application)
    } else {
      const result: any = await createApplication(application)
      console.log(result)
      applicationId = result?.applicationId as string
    }
    return applicationId
  }

  const createApplication = (application: Partial<Application>) => {
    const userId = localStorage.getItem('uid')
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({...application, userId: userId}),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/applications`, requestOptions as any)
      .catch(console.error)
  }

  const updateApplication = (application: Partial<Application>) => {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(application),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/applications/${application.id}`, requestOptions as any)
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
    saveApplication,
    submitApplication,
    getUnapprovedApplications,
    getUserApplications,
    getApplication,
    updateApplication,
  }
}
