import Alert from '@material-ui/lab/Alert'
import React, { Context, Dispatch, SetStateAction, createContext, useState } from 'react'
import { toast } from 'react-toastify'

interface SnackBarContext {
  open: boolean
  message: string
  duration: number
  setState: Dispatch<SetStateAction<Context<SnackBarContext>>>
  showFeedback: (options: { message?: string }) => any
}

const SnackbarAlert = ({message = 'Saved!'}) => {
  return (
    <Alert style={{width: '100%'}} severity="success">{message}</Alert>
  )
}

export const SnackBarContext: Context<SnackBarContext> = createContext<SnackBarContext>({
  open: false,
  message: 'Successfully Saved!',
  duration: 5000,
  setState: () => {},
  showFeedback: (message?:string) => {
    toast(<SnackbarAlert message={message || 'Saved!'} />, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    })
  }
})

export const SnackBarProvider = () => {
  const [ state, setState ] = useState(SnackBarContext)

  const value = {
    ...state,
    setState,
  }

  return (
    <SnackBarContext.Provider value={value} />
  )
}

export default SnackBarProvider
