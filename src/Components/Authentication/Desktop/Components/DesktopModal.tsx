import { ModalOptions } from "Components/Authentication/Types"
import Modal, { ModalProps } from "Components/Modal/Modal"
import React, { Component } from "react"
import styled from "styled-components"
import Events from "Utils/Events"
import { track } from "Utils/track"

export interface DesktopModalProps extends ModalProps {
  subtitle?: string
  onTypeChange?: (options: ModalOptions) => void
  onClose: () => void
  tracking?: any
  show?: boolean
  blurContainerSelector?: string
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class DesktopModal extends Component<DesktopModalProps> {
  onClose = () => {
    this.props.tracking.trackEvent({
      action: "Click",
      type: "dismiss",
      label: "dismiss auth modal",
      flow: "auth",
    })

    this.props.onClose()
  }

  render() {
    const title = this.props.subtitle || "The art world online"
    return (
      <Modal {...this.props} onClose={this.onClose} title={title} hasLogo>
        <Content>{this.props.children}</Content>
      </Modal>
    )
  }
}

const Content = styled.div`
  box-sizing: border-box;
`
