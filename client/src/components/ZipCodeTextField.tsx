import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import React from "react"
import MaskedInput from "react-text-mask"

interface MaskedTextFieldProps {
  inputRef: (ref: HTMLInputElement | null) => void
}

const MaskedTextField = (props: MaskedTextFieldProps) => {
  const { inputRef, ...other } = props
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u0023"}
      showMask={false}
      guide={false}
    />
  )
}

export default (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: MaskedTextField as any,
      }}
    />
  )
}
