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

interface Props {
  submitUrls: { [P in ModalType]: string }
  csrf: string
  redirectUrl?: string
  type?: ModalType
  handleSubmit?: (
    type: ModalType,
    values: InputValues,
    formikBag: FormikProps<InputValues>
  ) => void
}

interface State {
  currentType: ModalType
  copy?: string | null
}

export class ModalManager extends Component<Props, State> {
  state = {
    currentType: this.props.type || null,
    copy: null,
  }

  openModal = (options: ModalOptions) => {
    this.setState({
      currentType: options.mode,
      copy: options.copy,
    })
  }

  closeModal = () => {
    this.setState({
      currentType: null,
    })
  }

  render() {
    const { csrf, submitUrls, redirectUrl } = this.props
    const { currentType, copy } = this.state

    if (!currentType) {
      return null
    }

    const handleSubmit: SubmitHandler = !!this.props.handleSubmit
      ? this.props.handleSubmit.bind(this, currentType)
      : defaultHandleSubmit(submitUrls[currentType], csrf, redirectUrl)

    return (
      <DesktopModal
        show
        onTypeChange={this.openModal}
        onClose={this.closeModal}
        subtitle={copy}
      >
        <FormSwitcher type={currentType} handleSubmit={handleSubmit} />
      </DesktopModal>
    )
  }
}
