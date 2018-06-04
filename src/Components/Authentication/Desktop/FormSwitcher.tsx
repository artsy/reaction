import React from "react"
import { LoginForm } from "./LoginForm"
import { SignUpForm } from "./SignUpForm"
import { ResetPasswordForm } from "./ResetPasswordForm"
import {
  FormComponentType,
  InputValues,
  ModalType,
  SubmitHandler,
} from "../Types"

interface Props {
  type: ModalType
  values?: InputValues
  handleSubmit: SubmitHandler
  signupIntent?: string
  redirectUrl?: string
}

interface State {
  type?: ModalType
}

export class FormSwitcher extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    values: {},
  }

  state = {
    type: this.props.type,
  }

  presentModal = (newType: ModalType) => {
    this.setState({ type: newType })
  }

  render() {
    let Form: FormComponentType
    switch (this.state.type) {
      case "login":
        Form = LoginForm
        break
      case "signup":
        Form = SignUpForm
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
        handleTypeChange={type => this.presentModal(type)}
        handleSubmit={this.props.handleSubmit}
      />
    )
  }
}
