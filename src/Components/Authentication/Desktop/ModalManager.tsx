import React, { Component } from "react"
import { DesktopModal } from "./Components/DesktopModal"
import { FormSwitcher } from "./FormSwitcher"
import { handleSubmit } from "Components/Authentication/helpers"
import { ModalType } from "Components/Authentication/Types"

interface Props {
  submitUrls: { [P in ModalType]: string }
  csrf: string
  redirectUrl?: string
}

interface State {
  currentType: ModalType
}

export class ModalManager extends Component<Props, State> {
  state = {
    currentType: null,
  }

  openModal = (type: ModalType, redirectUrl?: string) => {
    this.setState({
      currentType: type,
    })
  }

  closeModal = () => {
    this.setState({
      currentType: null,
    })
  }

  render() {
    const { csrf, submitUrls, redirectUrl } = this.props
    const { currentType } = this.state

    if (!currentType) {
      return null
    }

    return (
      <DesktopModal
        show
        onTypeChange={this.openModal}
        onClose={this.closeModal}
      >
        <FormSwitcher
          type={currentType}
          handleSubmit={handleSubmit(
            submitUrls[currentType],
            csrf,
            redirectUrl
          )}
        />
      </DesktopModal>
    )
  }
}
