import Application from '../models/Application'
import { request } from '../util/request'
import { ApplicationStatus } from "../models/ApplicationStatus"

export default () => {
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

  const submitApplication = (applicationId: string): Promise<any> => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({status: ApplicationStatus.Submitted}),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/weekly-applications/${applicationId}`, requestOptions as any)
      .catch(console.error)
  }

  const createApplication = (application: Partial<Application>) => {
    // const body = JSON.stringify(formData)
    const userId = localStorage.getItem('uid')
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({...application, userId: userId}),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/weekly-applications`, requestOptions as any)
      .catch(console.error)
  }

  const updateApplication = (application: Partial<Application>) => {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(application),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/weekly-applications/${application.id}`, requestOptions as any)
      .catch(console.error)
  }

  const getUserApplications = () => {
    const userId = localStorage.getItem('uid')
    return request(`${process.env.REACT_APP_API_HOST}/api/users/${userId}/weekly-applications`)
    .then((result: any) => {
      if (!result.success) { return [] }
      return result.response
    })
    .catch(console.error)
  }

  const getApplication = (applicationId: string) => {
    return request(`${process.env.REACT_APP_API_HOST}/api/weekly-applications/${applicationId}`)
    .then((result: any) => {
      if (!result.success) { return undefined }
      return result.response
    })
    .catch(console.error)
  }

  return {
    submitApplication,
    saveApplication,
    getUserApplications,
    getApplication
  }
}
