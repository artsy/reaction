import qs from "querystring"
import React from "react"
import Events from "Utils/Events"
import { track } from "Utils/track"

import { ForgotPasswordForm } from "Components/Authentication/Desktop/ForgotPasswordForm"
import { LoginForm } from "Components/Authentication/Desktop/LoginForm"
import { SignUpForm } from "Components/Authentication/Desktop/SignUpForm"
import { MobileForgotPasswordForm } from "Components/Authentication/Mobile/ForgotPasswordForm"
import { MobileLoginForm } from "Components/Authentication/Mobile/LoginForm"
import { MobileSignUpForm } from "Components/Authentication/Mobile/SignUpForm"
import {
  FormComponentType,
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "./Types"

export interface FormSwitcherProps {
  error?: string
  handleSubmit: SubmitHandler
  handleTypeChange?: (e: string) => void
  isMobile?: boolean
  isStatic?: boolean
  onFacebookLogin?: (e: Event) => void
  onTwitterLogin?: (e: Event) => void
  options: ModalOptions
  tracking?: any
  type: ModalType
  values?: InputValues
}

export interface State {
  type?: ModalType
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class FormSwitcher extends React.Component<FormSwitcherProps, State> {
  static defaultProps: Partial<FormSwitcherProps> = {
    values: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
    }
  }

  componentDidMount() {
    const {
      options: {
        contextModule,
        copy,
        destination,
        redirectTo,
        intent,
        trigger,
        triggerSeconds,
      },
      type,
      tracking,
    } = this.props

    // Analytics
    const event = Object.assign(
      {
        action: "Auth impression",
        type,
        context_module: contextModule,
        modal_copy: copy,
        trigger: trigger || "click",
        trigger_seconds: triggerSeconds,
        intent,
        auth_redirect: redirectTo || destination,
      },
      type === "signup"
        ? {
            onboarding: !redirectTo,
          }
        : null
    )
    if (tracking) {
      tracking.trackEvent(event)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type && nextProps.type) {
      this.setState({
        type: nextProps.type,
      })
    }
  }

  handleTypeChange = (newType: ModalType) => {
    const { isMobile, isStatic, handleTypeChange, options } = this.props

    if (isMobile || isStatic) {
      window.location.href = `/${newType}?${qs.stringify(options)}`
    } else {
      this.setState({ type: newType })
      if (handleTypeChange) {
        handleTypeChange(newType)
      }
    }
  }

  render() {
    const { error, isMobile, onFacebookLogin, onTwitterLogin } = this.props

    let Form: FormComponentType
    switch (this.state.type) {
      case ModalType.login:
        Form = isMobile ? MobileLoginForm : LoginForm
        break
      case ModalType.signup:
        Form = isMobile ? MobileSignUpForm : SignUpForm
        break
      case ModalType.forgot:
        Form = isMobile ? MobileForgotPasswordForm : ForgotPasswordForm
        break
      default:
        return null
    }

    const { handleSubmit, values } = this.props
    const defaultValues = {
      email: values.email || "",
      password: values.password || "",
      name: values.name || "",
      accepted_terms_of_service: values.acceptedTermsOfService || false,
    }

    return (
      <Form
        error={error}
        values={defaultValues}
        handleTypeChange={this.handleTypeChange}
        handleSubmit={handleSubmit}
        onFacebookLogin={onFacebookLogin}
        onTwitterLogin={onTwitterLogin}
      />
    )
  }
}
