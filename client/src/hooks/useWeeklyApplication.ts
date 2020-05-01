import Application from '../models/Application'
import storage from '../util/storage'
import useWeeklyFormApi from "./useWeeklyFormApi"

export default () => {
  const api = useWeeklyFormApi()

  const load = () => {
    //load from API
    //save to localstorage
  }

  const save = async (application: Application): Promise<string> => {
    return  await api.saveApplication(application)
  }

  const localSave = (application:  Application) => {
    storage.save('weekly-application', application)
  }

  return {
    load,
    localSave,
    save
  }
}
