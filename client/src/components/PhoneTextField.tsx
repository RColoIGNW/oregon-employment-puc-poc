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
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask={false}
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
