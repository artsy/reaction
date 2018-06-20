import { handleSubmit as defaultHandleSubmit } from "Components/Authentication/helpers"
import {
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "Components/Authentication/Types"
import { FormikProps } from "formik"
import React, { Component } from "react"
import { DesktopModal } from "./Components/DesktopModal"
import { FormSwitcher } from "./FormSwitcher"

export interface ModalManagerProps {
  submitUrls?: { [P in ModalType]: string }
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
      ? this.props.handleSubmit.bind(this, currentType, options)
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
