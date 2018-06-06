import React, { Component } from "react"
import { FormikProps } from "formik"
import { DesktopModal } from "./Components/DesktopModal"
import { FormSwitcher } from "./FormSwitcher"
import { handleSubmit as defaultHandleSubmit } from "Components/Authentication/helpers"
import {
  InputValues,
  SubmitHandler,
  ModalType,
} from "Components/Authentication/Types"

export interface ModalManagerProps {
  submitUrls: { [P in ModalType]: string }
  csrf: string
  redirectUrl?: string
  handleSubmit?: (
    type: ModalType,
    values: InputValues,
    formikBag: FormikProps<InputValues>
  ) => void
}

export interface ModalManagerState {
  currentType?: ModalType
}

export interface ModalOptions {
  mode: ModalType
  edirectUrl?: string
}

export class ModalManager extends Component<
  ModalManagerProps,
  ModalManagerState
> {
  state = {
    currentType: null,
  }

  openModal = (options: ModalOptions) => {
    const type = options.mode
    this.setState({
      currentType: type,
    })
  }

  closeModal = () => {
    this.setState({
      currentType: null,
    })
  }

  onTypeChange = (type: ModalType, redirectUrl?: string) => {
    this.openModal({
      mode: type,
    })
  }

  render() {
    const { csrf, submitUrls, redirectUrl } = this.props
    const { currentType } = this.state

    if (!currentType) {
      return null
    }

    const handleSubmit: SubmitHandler = !!this.props.handleSubmit
      ? this.props.handleSubmit.bind(this, currentType)
      : defaultHandleSubmit(submitUrls[currentType], csrf, redirectUrl)

    return (
      <DesktopModal
        show
        onTypeChange={this.onTypeChange}
        onClose={this.closeModal}
      >
        <FormSwitcher type={currentType} handleSubmit={handleSubmit} />
      </DesktopModal>
    )
  }
}
