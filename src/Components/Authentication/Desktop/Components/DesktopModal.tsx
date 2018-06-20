import Colors from "Assets/Colors"
import { ModalOptions } from "Components/Authentication/Types"
import Icon from "Components/Icon"
import Modal, { ModalProps } from "Components/Modal/Modal"
import React, { Component } from "react"
import styled from "styled-components"
import Events from "Utils/Events"
import { track } from "Utils/track"
import { DesktopHeader } from "./DesktopHeader"

export interface DesktopModalProps extends ModalProps {
  subtitle?: string
  onTypeChange?: (options: ModalOptions) => void
  tracking?: any
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
    return (
      <Modal {...this.props}>
        <CloseButton name="close" onClick={this.onClose} />
        <DesktopHeader subtitle={this.props.subtitle} />
        <Content>{this.props.children}</Content>
      </Modal>
    )
  }
}

export const CloseButton = styled(Icon).attrs({
  color: Colors.graySemibold,
  fontSize: "16px",
})`
  position: absolute;
  top: 20px;
  right: 15px;
  cursor: pointer;
`

const Content = styled.div`
  box-sizing: border-box;
`
