import React, { Component } from "react"
import styled from "styled-components"
import Icon from "../Icon"
import Modal, { ModalProps } from "../Modal/Modal"
import Text from "../Text"
import Colors from "../../Assets/Colors"

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  margin: 20px 0 0;
`

const Content = styled.div`
  box-sizing: border-box;
  margin: 0px 60px;
`

const Logo = styled(Icon).attrs({
  color: "black",
  fontSize: "34px",
})`
  display: block;
`

const Subtitle = styled(Text).attrs({
  textSize: "medium",
  align: "center",
})`
  margin: 10px 0 15px 0;
`

const CloseButton = styled(Icon).attrs({
  color: Colors.grayRegular,
  fontSize: "16px",
})`
  position: absolute;
  top: 20px;
  right: 15px;
`

export interface DesktopModalProps extends ModalProps {
  subtitle?: string
}

export class DesktopModal extends Component<DesktopModalProps> {
  render() {
    const subtitle = this.props.subtitle || "The Art World Online"
    return (
      <Modal {...this.props}>
        <Header>
          <Logo name="logotype" />
          <Subtitle>{subtitle}</Subtitle>
          <CloseButton name="close" onClick={this.props.onClose} />
        </Header>
        <Content>{this.props.children}</Content>
      </Modal>
    )
  }
}
