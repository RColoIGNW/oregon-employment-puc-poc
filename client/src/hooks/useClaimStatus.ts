import { useContext } from 'react'

import { SnackBarContext } from '../providers/SnackbarProvider'
import { request } from '../util/request'

export default () => {
  const snackbar = useContext(SnackBarContext)

  const downloadApplication = (applicationId: string) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/pdf")
    headers.append("Authorization", `Bearer ${localStorage.token || ""}`)

    const requestOptions = {
      method: 'GET',
      headers,
      redirect: 'follow'
    } as any

    return request(`${process.env.REACT_APP_API_HOST}/api/generate-pdf/${applicationId}`, requestOptions, 'blob')
    .then((result: any) => {
      const file = new Blob([result], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL, '_blank')
      snackbar.showFeedback({ message: 'Download Complete' })
    })
    .catch(error => {
      console.error(error)
      snackbar.showFeedback({ message: 'Form Download Failed', severity: 'error' })
    })
  }

  return {
    downloadApplication,
  }
}
