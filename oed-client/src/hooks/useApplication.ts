import storage from '../util/storage'
import useApplicantFormApi from './useApplicantFormApi'
import Application from '../models/Application'


export default () => {
  const api = useApplicantFormApi()

  const load = () => {
    //load from API
    //save to localstorage    
  }

  const save = async (application: Application): Promise<string> => {
    return  await api.saveApplication(application)    
  }

  const localSave = (application:  Application) => {
    storage.save('application', application)
  }

  const submit = (applicationId: string) => {
    console.log('tetetetete')
    return api.submitApplication(applicationId)
  }

  return {
    load,
    localSave,
    save,
    submit
  }
}
