import React from "react"

import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { ResetPasswordForm } from "./ResetPasswordForm"
import {
  FormComponentType,
  InputValues,
  ModalType,
  SubmitHandler,
} from "./Types"

interface Props {
  type: ModalType
  values?: InputValues // necessary?
  handleSubmit: SubmitHandler
}

interface State extends React.HTMLProps<HTMLFormElement> {
  type?: ModalType
}

export class AuthForm extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    values: {},
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      type: this.props.type,
    }
  }

  presentModal = (newType: ModalType) => {
    return event => {
      event.preventDefault()
      this.setState({ type: newType })
    }
  }

  render() {
    let Form: FormComponentType
    switch (this.state.type) {
      case "login":
        Form = LoginForm
        break
      case "signup":
        Form = RegisterForm
        break
      case "reset_password":
        Form = ResetPasswordForm
        break
      default:
        throw new Error(`${this.state.type} mode needs a component`)
    }

    const { values } = this.props
    const defaultValues = {
      email: values.email || "",
      password: values.password || "",
      name: values.name || "",
      acceptedTermsOfService: values.acceptedTermsOfService || false,
    }

    return (
      <Form
        values={defaultValues}
        handleTypeChange={this.presentModal}
        handleSubmit={this.props.handleSubmit}
      />
    )
  }
}
