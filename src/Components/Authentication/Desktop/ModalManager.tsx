import React, { Component } from "react"
import { FormikProps } from "formik"
import { DesktopModal } from "./Components/DesktopModal"
import { FormSwitcher } from "./FormSwitcher"
import { handleSubmit as defaultHandleSubmit } from "Components/Authentication/helpers"
import {
  InputValues,
  SubmitHandler,
  ModalOptions,
  ModalType,
} from "Components/Authentication/Types"

export interface ModalManagerProps {
  submitUrls?: { [P in ModalType]: string } & {
    facebook?: string
    twitter?: string
  }
  csrf?: string
  redirectUrl?: string
  handleSubmit?: (
    type: ModalType,
    values: InputValues,
    formikBag: FormikProps<InputValues>
  ) => void
}

export interface ModalManagerState {
  currentType?: ModalType
  copy?: string | null
  redirectTo?: string
}

export class ModalManager extends Component<
  ModalManagerProps,
  ModalManagerState
> {
  state = {
    currentType: null,
    copy: null,
    redirectTo: "/",
  }

  openModal = (options: ModalOptions) => {
    this.setState({
      currentType: options.mode,
      copy: options.copy,
      redirectTo: options.redirectUrl || "/",
    })
  }

  closeModal = () => {
    this.setState({
      currentType: null,
    })
  }

  render() {
    const { csrf, submitUrls } = this.props
    const { currentType, copy, redirectTo } = this.state
    const redirectUrl = this.props.redirectUrl || redirectTo

    if (!currentType) {
      return null
    }

    const handleSubmit: SubmitHandler = !!this.props.handleSubmit
      ? this.props.handleSubmit.bind(this, currentType)
      : defaultHandleSubmit(submitUrls[currentType], csrf, redirectUrl)

    return (
      <DesktopModal
        show={!!currentType}
        onTypeChange={this.openModal}
        onClose={this.closeModal}
        subtitle={copy}
      >
        <FormSwitcher
          type={currentType}
          handleSubmit={handleSubmit}
          onFacebookLogin={() =>
            (window.location.href =
              submitUrls.facebook + "?redirect-to=" + redirectUrl)
          }
          onTwitterLogin={() =>
            (window.location.href =
              submitUrls.twitter + "?redirect-to=" + redirectUrl)
          }
        />
      </DesktopModal>
    )
  }
}
