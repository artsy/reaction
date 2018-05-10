import React, { Component } from "react"
import styled from "styled-components"
import Icon from "../Icon"
import Modal, { ModalProps } from "../Modal/Modal"
import { ModalType } from "./Types"
import Colors from "Assets/Colors"
import { DesktopHeader } from "./DesktopHeader"

export interface DesktopModalProps extends ModalProps {
  subtitle?: string
  onTypeChange?: (type: ModalType) => void
}

export class DesktopModal extends Component<DesktopModalProps> {
  render() {
    return (
      <Modal {...this.props}>
        <CloseButton name="close" onClick={this.props.onClose} />
        <DesktopHeader subtitle={this.props.subtitle} />
        <Content>{this.props.children}</Content>
      </Modal>
    )
  }
}

const CloseButton = styled(Icon).attrs({
  color: Colors.grayRegular,
  fontSize: "16px",
})`
  position: absolute;
  top: 20px;
  right: 15px;
  cursor: pointer;
`

const Content = styled.div`
  box-sizing: border-box;
  margin: 0px 60px;
`
