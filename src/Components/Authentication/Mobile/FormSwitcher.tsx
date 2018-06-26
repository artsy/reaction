import React from "react"
import {
  FormComponentType,
  InputValues,
  ModalType,
  SubmitHandler,
} from "../Types"
import { MobileForgotPasswordForm } from "./ForgotPasswordForm"
import { MobileLoginForm } from "./LoginForm"
import { MobileSignUpForm } from "./SignUpForm"

interface Props {
  type: ModalType
  values?: InputValues
  handleSubmit: SubmitHandler
  redirectUrl?: string
  error?: string
  onFacebookLogin?: (e: Event) => void
  onTwitterLogin?: (e: Event) => void
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
    const { error, onFacebookLogin, onTwitterLogin } = this.props

    let Form: FormComponentType
    switch (this.state.type) {
      case ModalType.login:
        Form = MobileLoginForm
        break
      case ModalType.signup:
        Form = MobileSignUpForm
        break
      case ModalType.forgot:
        Form = MobileForgotPasswordForm
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
        error={error}
        values={defaultValues}
        handleTypeChange={type => this.presentModal(type)}
        handleSubmit={this.props.handleSubmit}
        onFacebookLogin={onFacebookLogin}
        onTwitterLogin={onTwitterLogin}
      />
    )
  }
}
