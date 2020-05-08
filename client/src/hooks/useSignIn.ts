import { navigate } from 'gatsby'
import { useContext, useState } from 'react'

import firebase from '../lib/firebase'
import { SnackBarContext } from '../providers/SnackbarProvider'

export default () => {
  const snackbar = useContext(SnackBarContext)
  const [state, setState] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleChange = (event: any) => {
    event?.persist?.()
    if (event?.target?.name) {
      setState(s => ({
        ...s,
        [event.target.name]: event.target.value
      }))
    }
  }

  const handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(state.email, state.password)
    .then(() => navigate('/dashboard'))
    .catch((error: any) => {
      const errorMessage = error.message;
      snackbar.showFeedback({message: errorMessage, severity: 'error'})
    });
  }

  return {
    handleSubmit,
    handleChange,
    email: state.email,
    password: state.password,
    rememeberMe: state.rememberMe,
  }
}
