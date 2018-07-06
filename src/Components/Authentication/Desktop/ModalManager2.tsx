import { FormikProps } from "formik"
import qs from "querystring"
import React, { Component } from "react"

import { DesktopModal } from "Components/Authentication/Desktop/Components/DesktopModal"
import { FormSwitcher } from "Components/Authentication/FormSwitcher"
import { handleSubmit as defaultHandleSubmit } from "Components/Authentication/helpers"
import {
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "Components/Authentication/Types"

export interface ModalManagerProps {
  submitUrls?: { [P in ModalType]: string } & {
    facebook?: string
    twitter?: string
  }
  csrf?: string
  redirectTo?: string
  tracking?: any
  type?: ModalType
  handleSubmit?: (
    type: ModalType,
    options: ModalOptions,
    values: InputValues,
    formikBag: FormikProps<InputValues>
  ) => void
  blurContainerSelector?: string
}

export interface ModalManagerState {
  currentType?: ModalType
  options?: ModalOptions
  error?: string
  switchedForms: boolean
}

export class ModalManager2 extends Component<
  ModalManagerProps,
  ModalManagerState
> {
  state: ModalManagerState = {
    currentType: null,
    options: {
      copy: null,
      redirectTo: "/",
    },
    switchedForms: false,
  }

  openModal = (options: ModalOptions) => {
    const { mode } = options

    this.setState({
      currentType: mode,
      options,
    })

    document.body.style.overflowY = "hidden"
  }

  closeModal = () => {
    this.setState({
      currentType: null,
      options: {},
    })
    document.body.style.overflowY = "auto"
  }

  handleTypeChange = type => {
    const newOptions = {
      ...this.state.options,
      mode: type,
    }

    this.setState({
      currentType: type,
      options: newOptions,
      switchedForms: true,
    })
  }

  setError = err => this.setState({ error: err })

  getSubtitle = () => {
    const { options, switchedForms, currentType } = this.state

    if (switchedForms) {
      switch (currentType) {
        case ModalType.login:
          return "Log in"
        case ModalType.signup:
          return "Sign up"
        case ModalType.forgot:
          return "Forgot Password"
        default:
          return "The art world online"
      }
    } else {
      return options.copy || "The art world online"
    }
  }

  render() {
    const { blurContainerSelector, csrf, submitUrls, redirectTo } = this.props
    const { currentType, error, options } = this.state

    const handleSubmit: SubmitHandler = !!this.props.handleSubmit
      ? this.props.handleSubmit.bind(this, currentType, options)
      : defaultHandleSubmit(submitUrls[currentType], csrf, redirectTo)

    const queryData = Object.assign(
      {},
      options,
      {
        accepted_terms_of_service: true,
        agreed_to_receive_emails: true,
        "signup-referer": options.signupReferer || location.href,
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

    return (
      <DesktopModal
        blurContainerSelector={blurContainerSelector}
        show={!!currentType}
        onTypeChange={this.openModal}
        onClose={this.closeModal}
        subtitle={this.getSubtitle()}
        type={currentType}
      >
        <FormSwitcher
          type={currentType}
          error={error}
          handleSubmit={handleSubmit}
          onFacebookLogin={() =>
            (window.location.href = submitUrls.facebook + `?${authQueryData}`)
          }
          onTwitterLogin={() =>
            (window.location.href = submitUrls.twitter + `?${authQueryData}`)
          }
          options={options}
          handleTypeChange={this.handleTypeChange}
        />
      </DesktopModal>
    )
  }
}
