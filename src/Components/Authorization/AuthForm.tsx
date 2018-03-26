import React from "react"

import ForgotPasswordForm from "./ForgotPasswordForm"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { FormComponentType, InputErrors, InputValues, Mode } from "./Types"

interface Props extends React.HTMLProps<HTMLFormElement> {
  mode: Mode
  values?: InputValues
  errors?: InputErrors
  handleSubmit: () => void
  // signupIntent?: string
  // destination?: string
}

interface State extends React.HTMLProps<HTMLFormElement> {
  mode?: Mode
}

class AuthForm extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    errors: {},
    values: {},
    // signupIntent: "sign_up",
    // destination: "/personalize",
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      mode: this.props.mode,
    }
  }

  handleChangeMode = (newMode: Mode) => {
    return event => {
      event.preventDefault()
      this.setState({ mode: newMode })
    }
  }

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = e => {
    return true
  }

  render() {
    const { values, errors } = this.props
    let Form: FormComponentType
    switch (this.state.mode) {
      case "log_in":
        Form = LoginForm
        break
      case "register":
        Form = RegisterForm
        break
      case "forgot_password":
        Form = ForgotPasswordForm
        break
      default:
        throw new Error(`${this.state.mode} mode needs a component`)
    }
    return (
      <Form
        {...{ errors, values }}
        handleChangeMode={this.handleChangeMode}
        handleSubmit={this.props.handleSubmit}
      />
    )
  }
}

export default AuthForm
