import { LocationProps } from "@reach/router"
import React, { Context, createContext, useEffect, useState } from 'react'

import Backdrop from '../components/page-transition'

interface TransitionContext {
  open?: boolean
  message?: string
}
export const TransitionContext: Context<any> = createContext({
  open: false,
  message: '',
  setState: (state: { open: boolean, message: string }) => {}
})

interface TransitionProps {
  children: any,
  location: {
    location: LocationProps|any
  }
}

export const TransitionProvider = (props: TransitionProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const startTransition = () => {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 500)
    }
    startTransition()
    return () => {}
  }, [props.location.location.pathname])

  const [ state, setState ] = useState(TransitionContext as any)
  const value = {
    state: state,
    setState: (context: {open: boolean, message: string}) => {
      console.log('====================================')
      console.log('set state', context)
      console.log('====================================')
      setState(context as any)
    }
  }

  return (
    <TransitionContext.Provider value={value}>
    {props.children}s
    <Backdrop open={!!state.open || open} />
    </TransitionContext.Provider>
  )
}

export default TransitionProvider
