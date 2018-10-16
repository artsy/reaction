import { ModalOptions } from "Components/Authentication/Types"
import Modal, { ModalProps } from "Components/Modal/Modal"
import React, { Component } from "react"
import track from "react-tracking"
import { TrackingProp } from "react-tracking"
import Events from "Utils/Events"

export interface DesktopModalProps extends ModalProps {
  blurContainerSelector?: string
  onClose: () => void
  onTypeChange?: (options: ModalOptions) => void
  show?: boolean
  subtitle?: string
  tracking?: TrackingProp
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
        {this.props.children}
      </Modal>
    )
  }
}
