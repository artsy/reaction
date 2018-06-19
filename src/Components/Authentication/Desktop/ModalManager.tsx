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
  options?: ModalOptions
}

export class ModalManager extends Component<
  ModalManagerProps,
  ModalManagerState
> {
  state = {
    currentType: null,
    options: {
      copy: null,
    },
  }

  openModal = (options: ModalOptions) => {
    const { mode } = options

    this.setState({
      currentType: mode,
      options,
    })
  }

  closeModal = () => {
    this.setState({
      currentType: null,
      options: null,
    })
  }

  render() {
    const { csrf, submitUrls, redirectTo } = this.props
    const { currentType, options } = this.state

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
        subtitle={options.copy}
      >
        <FormSwitcher
          type={currentType}
          handleSubmit={handleSubmit}
          options={options}
        />
      </DesktopModal>
    )
  }
}
