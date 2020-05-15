import { Collapse } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import WarningIcon from "@material-ui/icons/Warning"
import { Alert, AlertTitle } from "@material-ui/lab"
import React, { forwardRef } from "react"

export type AlertSeverity = "error" | "warning" | "info" | "success"

export type AlertVariant = "filled" | "outlined" | "standard"

export interface AlertProps {
  severity?: AlertSeverity
  variant?: AlertVariant
  title?: string | JSX.Element
  message?: string | JSX.Element
  isOpen?: boolean
  icon?: JSX.Element
  onClose?: () => any
}

const Alerts = forwardRef<HTMLElement, AlertProps>((props, ref) => (
  <Collapse in={props.isOpen}>
    <Alert
      onClose={props?.onClose}
      ref={ref}
      severity={props.severity}
      variant={props.variant}
      iconMapping={{
        success: props.icon || <CheckCircleIcon fontSize="inherit" />,
        error: props.icon || <ErrorIcon fontSize="inherit" />,
        warning: props.icon || <WarningIcon fontSize="inherit" />,
        info: props.icon || <InfoIcon fontSize="inherit" />,
      }}
    >
      <AlertTitle>{props.title}</AlertTitle>
      {props.message}
    </Alert>
  </Collapse>
))

export default Alerts
