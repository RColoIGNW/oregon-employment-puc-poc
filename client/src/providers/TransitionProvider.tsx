import React, { Context, createContext, useState } from "react"
interface TransitionContext {
  open?: boolean
  message?: string
}
export const TransitionContext: Context<any> = createContext({
  open: false,
  message: "",
})

export const TransitionProvider = (props: { children: any }) => {
  const [state, setState] = useState(TransitionContext)
  const value = {
    state,
    setState: (context: any) => setState(context),
  }

  return (
    <TransitionContext.Provider value={value}>
      {props.children}
    </TransitionContext.Provider>
  )
}

export default TransitionProvider
