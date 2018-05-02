import React from "react"

import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { ResetPasswordForm } from "./ResetPasswordForm"
import { FormComponentType, InputValues, Mode, SubmitHandler } from "./Types"

interface Props {
  mode: Mode
  values?: InputValues // necessary?
  handleSubmit: SubmitHandler
}

interface State extends React.HTMLProps<HTMLFormElement> {
  mode?: Mode
}

export class AuthForm extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    values: {},
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

  render() {
    let Form: FormComponentType
    switch (this.state.mode) {
      case "login":
        Form = LoginForm
        break
      case "register":
        Form = RegisterForm
        break
      case "reset_password":
        Form = ResetPasswordForm
        break
      default:
        throw new Error(`${this.state.mode} mode needs a component`)
    }
    return (
      <Form
        values={values}
        handleChangeMode={this.handleChangeMode}
        handleSubmit={this.props.handleSubmit}
      />
    )
  }
}

const values = {
  email: "",
  password: "",
  name: "",
  acceptedTermsOfService: false,
}
