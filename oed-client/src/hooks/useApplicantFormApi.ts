import SaveApplicantForm from '../models/SaveApplicantForm'
import { request } from '../util/request'

export default () => {

  const getUnapprovedApplications = () => {
    return request('http://localhost:4000/api/applications')
    .then((result: any) => {
      if (!result.success) { return [] }
      return result.response
    })
    .catch(console.error)
  }

  const saveForm = (formData: Partial<SaveApplicantForm>) => {
    const body = JSON.stringify(formData)

    const requestOptions = {
      method: 'POST',
      body,
      redirect: 'follow',
    }

    return request('http://localhost:4000/api/new-application', requestOptions as any)
      .catch(console.error)
  }

  return {
    saveForm,
    getUnapprovedApplications,
  }
}
