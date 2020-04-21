import SaveApplicantForm from '../models/SaveApplicantForm'
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

  const saveForm = (formData: Partial<SaveApplicantForm>) => {
    // const body = JSON.stringify(formData)
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({...formData, uid: localStorage.getItem('uid')}),
      redirect: 'follow',
    }
    return request(`${process.env.REACT_APP_API_HOST}/api/new-application`, requestOptions as any)
      .catch(console.error)
  }

  return {
    saveForm,
    getUnapprovedApplications,
  }
}
