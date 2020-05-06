import Alert from '@material-ui/lab/Alert'
import React, { Context, Dispatch, SetStateAction, createContext, useState } from 'react'
import { toast } from 'react-toastify'

import { AlertSeverity } from '../components/alerts/Alerts'

interface FeedbackOptions {
  message?: string
  severity?: AlertSeverity,
  duration?: number
  toastId?: string
}

interface SnackBarContext {
  setState: Dispatch<SetStateAction<Context<SnackBarContext>>>
  showFeedback: (options?: FeedbackOptions) => any,
  isActive: (arg: any) => any
}

const SnackbarAlert = (props: { options: FeedbackOptions }) => {
  return (
    <Alert style={{width: '100%'}} severity={props.options.severity}>{props.options.message}</Alert>
  )
}

export const SnackBarContext: Context<SnackBarContext> = createContext<SnackBarContext>({
  setState: () => {},
  showFeedback: (options?: FeedbackOptions|any) => {
    toast(<SnackbarAlert options={options} />, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: options?.duration || 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      toastId: options?.toastId,
    })
  },
  isActive: toast.isActive
})

export const SnackBarProvider = () => {
  const [ state, setState ] = useState(SnackBarContext)

  const value = {
    ...state,
    setState,
  }

  return (
    <SnackBarContext.Provider value={value as any} />
  )
}

export default SnackBarProvider
