import { useContext } from "react"

import firebase from "../lib/firebase"
import Application from "../models/Application"
import { ApplicationStatus } from "../models/ApplicationStatus"
import { TransitionContext } from "../providers/TransitionProvider"
import { RequestOptions, ResponseType, request } from "../util/request"
import storage from "../util/storage"

export default () => {
  const { setState: setTransitionState } = useContext(TransitionContext)
  const userId = firebase?.auth?.()?.currentUser?.uid || storage.load("uid")

  const getUnapprovedApplications = () => {
    return doRequest(`${process.env.REACT_APP_API_HOST}/api/applications`).then(
      (result: any) => {
        if (!result.success) {
          return []
        }
        return result.response
      }
    )
  }

  const submitApplication = (applicationId: string): Promise<any> => {
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({ status: ApplicationStatus.Submitted }),
      redirect: "follow",
    }
    return doRequest(
      `${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}/submit`,
      requestOptions as any
    )
  }

  const createApplication = (): Promise<any> => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({ userId }),
      redirect: "follow",
    }
    return doRequest(
      `${process.env.REACT_APP_API_HOST}/api/applications`,
      requestOptions as any
    )
  }

  const updateApplication = (application: Partial<Application | any>) => {
    console.log(application)
    const requestOptions = {
      method: "PATCH",
      // body: JSON.stringify({...application }), // TODO: fix upstream data
      body: JSON.stringify({
        ...application,
        userId,
        lastModified: undefined,
        success: undefined,
        applicationId: undefined,
        id: application?.applicationId as string,
      }),
      redirect: "follow",
    }
    return doRequest(
      `${process.env.REACT_APP_API_HOST}/api/applications/${application.id}`,
      requestOptions as any
    )
  }

  const getUserApplications = (): Promise<Application[]> => {
    const userId = storage.load("uid")
    return doRequest(
      `${process.env.REACT_APP_API_HOST}/api/users/${userId}/applications`
    ).then((result: any) => {
      if (!result.success) {
        return []
      }
      return result.response
    })
  }

  const getApplication = (applicationId: string) => {
    return doRequest(
      `${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}`
    ).then((result: any) => {
      if (!result.success) {
        return undefined
      }
      return result.response
    })
  }

  const doRequest = async (
    url: string,
    options?: RequestOptions,
    responseType?: ResponseType
  ) => {
    try {
      setTransitionState({ open: true })
      return await request(url, options, responseType)
    } finally {
      setTransitionState({ open: false })
    }
  }

  // TODO: Discuss if we want to allow delete an application or only put it in discarded status - move to an discarded collection
  const discardApplication = (applicationId: string): Promise<any> => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    }
    return request(
      `${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}`,
      requestOptions as any
    ).catch(console.error)
  }

  return {
    getApplication,
    createApplication,
    submitApplication,
    updateApplication,
    discardApplication,
    getUnapprovedApplications,
    getUserApplications,
  }
}
