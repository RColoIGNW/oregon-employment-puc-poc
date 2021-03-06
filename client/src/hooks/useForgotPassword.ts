import { navigate } from "gatsby"
import { useContext, useState } from "react"

import firebase from "../lib/firebase"
import { SnackBarContext } from "../providers/SnackbarProvider"

export default () => {
  const snackbar = useContext(SnackBarContext)
  const [state, setState] = useState({
    email: "",
  })

  const handleChange = (event: any) => {
    event?.persist?.()
    if (event?.target?.name) {
      setState((s) => ({
        ...s,
        [event.target.name]: event.target.value,
      }))
    }
  }

  const handleSubmit = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(state.email)
      .then(() => {
        snackbar.showFeedback({ message: "Reset Password Link Sent!" })
        return navigate("/")
      })
      .catch((error: any) => {
        const errorMessage = error.message
        snackbar.showFeedback({ message: errorMessage, severity: "error" })
      })
  }

  return {
    handleSubmit,
    handleChange,
    email: state.email,
  }
}
