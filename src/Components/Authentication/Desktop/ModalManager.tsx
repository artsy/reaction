import React, { Component } from "react"
import { FormikProps } from "formik"
import { DesktopModal } from "./Components/DesktopModal"
import { FormSwitcher } from "./FormSwitcher"
import { handleSubmit as defaultHandleSubmit } from "Components/Authentication/helpers"
import { track } from "../../../Utils/track"
import Events from "../../../Utils/Events"
import {
  InputValues,
  SubmitHandler,
  ModalOptions,
  ModalType,
} from "Components/Authentication/Types"

export interface ModalManagerProps {
  submitUrls?: { [P in ModalType]: string }
  csrf?: string
  redirectTo?: string
  tracking?: any
  type?: ModalType
  handleSubmit?: (
    type: ModalType,
    values: InputValues,
    formikBag: FormikProps<InputValues>
  ) => void
}

export interface ModalManagerState {
  currentType?: ModalType
  copy?: string | null
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class ModalManager extends Component<
  ModalManagerProps,
  ModalManagerState
> {
  state = {
    currentType: null,
    copy: null,
  }

  openModal = (options: ModalOptions) => {
    const {
      mode,
      contextModule,
      copy,
      signupIntent,
      redirectUrl,
      destination,
    } = options
    console.log("Im in here..")
    this.setState({
      currentType: mode,
      copy,
    })

    // Analytics
    const event = Object.assign(
      {
        action: "Auth impression",
        type: mode,
        label: contextModule,
        modal_copy: copy,
      },
      options.mode === "signup"
        ? {
            signup_intent: signupIntent,
            signup_redirect: redirectUrl || destination,
            onboarding: !redirectUrl,
          }
        : null
    )
    this.props.tracking.trackEvent(event)
  }

  closeModal = () => {
    this.props.tracking.trackEvent({
      action: "Click",
      type: "dismiss",
      label: "dismiss auth modal",
      flow: "auth",
    })

    this.setState({
      currentType: null,
    })
  }

  render() {
    const { csrf, submitUrls, redirectTo } = this.props
    const { currentType, copy } = this.state

    if (!currentType) {
      return null
    }

    const handleSubmit: SubmitHandler = !!this.props.handleSubmit
      ? this.props.handleSubmit.bind(this, currentType)
      : defaultHandleSubmit(submitUrls[currentType], csrf, redirectTo)

    return (
      <DesktopModal
        show={!!currentType}
        onTypeChange={this.openModal}
        onClose={this.closeModal}
        subtitle={copy}
      >
        <FormSwitcher type={currentType} handleSubmit={handleSubmit} />
      </DesktopModal>
    )
  }
}
