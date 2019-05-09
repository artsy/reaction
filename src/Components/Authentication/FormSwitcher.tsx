import { Theme } from "@artsy/palette"
import qs from "querystring"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import Events from "Utils/Events"

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
  title?: string
  showRecaptchaDisclaimer?: boolean
  submitUrls?: { [P in ModalType]: string } & {
    facebook?: string
    twitter?: string
  }
  tracking?: TrackingProp
  type: ModalType
  values?: InputValues
  onSocialAuthEvent?: (options) => void
  onBackButtonClicked?: (e: Event) => void
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
      if (typeof window !== "undefined") {
        window.location.assign(`/${newType}?${qs.stringify(options)}`)
      }
    } else {
      this.setState({ type: newType })
      if (handleTypeChange) {
        handleTypeChange(newType)
      }
    }
  }

  render() {
    const {
      error,
      isMobile,
      title,
      options,
      showRecaptchaDisclaimer,
    } = this.props

    const queryData = Object.assign(
      {},
      options,
      {
        accepted_terms_of_service: true,
        agreed_to_receive_emails: true,
        "signup-referer": options.signupReferer,
      },
      options.redirectTo
        ? {
            "redirect-to": options.redirectTo,
          }
        : null,
      options.intent
        ? {
            "signup-intent": options.intent,
          }
        : null
    )

    const authQueryData = qs.stringify(queryData)

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

    const { handleSubmit, onBackButtonClicked, values } = this.props
    const defaultValues = {
      email: values.email || "",
      password: values.password || "",
      name: values.name || "",
      accepted_terms_of_service: values.accepted_terms_of_service || false,
    }

    return (
      <Theme>
        <Form
          title={title}
          contextModule={options.contextModule}
          error={error}
          values={defaultValues}
          handleTypeChange={this.handleTypeChange}
          handleSubmit={handleSubmit}
          intent={options.intent}
          onBackButtonClicked={onBackButtonClicked}
          onFacebookLogin={() => {
            if (this.props.onSocialAuthEvent) {
              this.props.onSocialAuthEvent({
                ...options,
                service: "facebook",
              })
            }

            if (typeof window !== "undefined") {
              window.location.href =
                this.props.submitUrls.facebook +
                `?${authQueryData}` +
                "&service=facebook"
            }
          }}
          showRecaptchaDisclaimer={showRecaptchaDisclaimer}
        />
      </Theme>
    )
  }
}
