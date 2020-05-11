import { useContext } from 'react'

import Application from '../models/Application'
import { ApplicationStatus } from '../models/ApplicationStatus'
import { TransitionContext } from '../providers/TransitionProvider'
import { RequestOptions, ResponseType, request } from '../util/request'

export default () => {
  const { setState: setTransitionState } = useContext(TransitionContext)

  const getUnapprovedApplications = () => {
    return doRequest(`${process.env.REACT_APP_API_HOST}/api/applications`)
      .then((result: any) => {
        if (!result.success) { return [] }
        return result.response
      })
  }

  const submitApplication = (applicationId: string): Promise<any> => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({ status: ApplicationStatus.Submitted }),
      redirect: 'follow',
    }
    return doRequest(`${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}/submit`, requestOptions as any)
  }

  const createApplication = (): Promise<any> => {
    const userId = localStorage.getItem('uid')
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({ userId }),
      redirect: 'follow',
    }
    return doRequest(`${process.env.REACT_APP_API_HOST}/api/applications`, requestOptions as any)
  }

  const updateApplication = (application: Partial<Application|any>) => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({...application, success: undefined, applicationId: undefined, id: application?.applicationId as string }), // TODO: fix upstream data
      redirect: 'follow',
    }
    return doRequest(`${process.env.REACT_APP_API_HOST}/api/applications/${application.id}`, requestOptions as any)
  }

  const getUserApplications = (): Promise<Application[]> => {
    const userId = localStorage.getItem('uid')
    return doRequest(`${process.env.REACT_APP_API_HOST}/api/users/${userId}/applications`)
      .then((result: any) => {
        if (!result.success) { return [] }
        return result.response
      })
  }

  const getApplication = (applicationId: string) => {
    return doRequest(`${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}`)
      .then((result: any) => {
        if (!result.success) { return undefined }
        return result.response
      })
  }

  const doRequest = async (url: string, options?: RequestOptions, responseType?: ResponseType) => {
    try {
      setTransitionState({ open: true })
      return await request(url, options, responseType)
    } finally {
      setTransitionState({ open: false })
    }
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
