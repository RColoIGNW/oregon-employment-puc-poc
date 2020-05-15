import weeklyQuestions from "../models/weeklyQuestions"
import { request } from "../util/request"
import storage from "../util/storage"

export default () => {
  const saveApplication = async (
    application: Partial<weeklyQuestions>
  ): Promise<string> => {
    let applicationId: string = application.applicationId || ""

    if (applicationId) {
      await updateApplication(application)
    } else {
      const result: any = await createApplication(application)
      applicationId = result?.applicationId as string
    }
    return applicationId
  }

  const submitApplication = (application: Partial<weeklyQuestions>) => {
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify(application),
      redirect: "follow",
    }
    return request(
      `${process.env.REACT_APP_API_HOST}/api/weekly-applications/${application.applicationId}/submit`,
      requestOptions as any
    ).catch(console.error)
  }

  const createApplication = (application: Partial<weeklyQuestions>) => {
    const userId = storage.load("uid")
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({ ...application, userId }),
      redirect: "follow",
    }
    return request(
      `${process.env.REACT_APP_API_HOST}/api/weekly-applications`,
      requestOptions as any
    ).catch(console.error)
  }

  const updateApplication = (application: Partial<weeklyQuestions>) => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(application),
      redirect: "follow",
    }
    return request(
      `${process.env.REACT_APP_API_HOST}/api/weekly-applications/${application.applicationId}`,
      requestOptions as any
    ).catch(console.error)
  }

  const getUserApplications = () => {
    const userId = storage.load("uid")
    return request(
      `${process.env.REACT_APP_API_HOST}/api/users/${userId}/weekly-applications`
    )
      .then((result: any) => {
        if (!result.success) {
          return []
        }
        return result.response
      })
      .catch(console.error)
  }

  const getApplication = (applicationId: string) => {
    return request(
      `${process.env.REACT_APP_API_HOST}/api/weekly-applications/${applicationId}`
    )
      .then((result: any) => {
        if (!result.success) {
          return undefined
        }
        return result.response
      })
      .catch(console.error)
  }

  return {
    submitApplication,
    saveApplication,
    getUserApplications,
    getApplication,
  }
}
