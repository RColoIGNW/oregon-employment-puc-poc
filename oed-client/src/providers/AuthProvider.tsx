import { User } from 'firebase'
import React, {
  Context,
  FunctionComponent as FC,
  createContext,
  useEffect,
  useState,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import firebase from '../lib/firebase'

// tslint:disable-next-line
export interface AuthUser extends User {
  token: string
}

export interface AuthContext {
  user: AuthUser | undefined
  loading: boolean,
  error: firebase.auth.Error | undefined
}

export const AuthContext: Context<AuthContext> = createContext<AuthContext>(
  {
    user: undefined,
    loading: true,
    error: undefined,
  }
)

export const AuthProvider: FC = ({ children }) => {
  const [ user, loading, error ] = useAuthState(firebase.auth && firebase.auth())
  const [token, setToken] = useState(typeof window !== 'undefined' && localStorage.token || '')

  useEffect(() => {
    const getAccountInformation = async () => {
      const t = await user?.getIdToken() || ''
      localStorage.setItem('token', t)
      setToken(t)
    }
    getAccountInformation() // tslint:disable-line
  }, [ user ])

  return <AuthContext.Provider
    value={{
      user: {
        ...user,
        token,
      } as any,
      loading,
      error,
    }}
    children={children}
  />
}

export default AuthProvider
