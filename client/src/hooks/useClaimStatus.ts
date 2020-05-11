import { useContext } from 'react'

import { SnackBarContext } from '../providers/SnackbarProvider'
import { request } from '../util/request'

export default () => {
  const snackbar = useContext(SnackBarContext)

  const downloadApplication = async (applicationId: string) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/pdf")
    headers.append("Authorization", `Bearer ${localStorage.token || ""}`)

    const requestOptions = {
      method: 'GET',
      headers,
      redirect: 'follow'
    } as any

    try {
      snackbar.showFeedback({ message: 'Download in progress', severity: 'info' })
      const result = await request(`${process.env.REACT_APP_API_HOST}/api/generate-pdf/${applicationId}`, requestOptions, 'blob')
      const file = new Blob([ result as Blob ], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL, '_blank')
      snackbar.showFeedback({ message: 'Download Complete' })
    }
    catch (error) {
      console.error(error)
      snackbar.showFeedback({ message: 'Form Download Failed', severity: 'error' })
    }
  }

  return {
    downloadApplication,
  }
}
