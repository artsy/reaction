import { color, space } from "@artsy/palette"
import FadeTransition from "Components/Animation/FadeTransition"
import React from "react"
import styled from "styled-components"
import { Icon } from "Styleguide/Elements/icons/Icon"

interface WeChatIconState {
  hover: boolean
}

export class WeChatIcon extends React.Component<any, WeChatIconState> {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }
  render() {
    return (
      <WeChatContainer href="http://weixin.qq.com/r/2CotNbbES_s0rfJW93-K">
        <Icon
          onMouseEnter={() => {
            this.setState({ hover: true })
          }}
          onMouseLeave={() => {
            this.setState({ hover: false })
          }}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...this.props}
        >
          <path d="M21.5 19.52a5.67 5.67 0 0 0 2.5-4.55c0-3.33-3.24-6.02-7.23-6.02s-7.23 2.7-7.23 6.02c0 3.33 3.24 6.02 7.23 6.02.83 0 1.62-.11 2.36-.33l.21-.03c.14 0 .27.05.39.11l1.58.92.14.04c.13 0 .24-.1.24-.24l-.04-.17-.33-1.22-.02-.15c0-.16.08-.3.2-.4zM8.67 2.3C3.88 2.3 0 5.53 0 9.53a6.8 6.8 0 0 0 3 5.46c.14.1.24.28.24.47l-.03.18-.4 1.46-.04.21c0 .16.13.3.3.3l.16-.06 1.9-1.1a.9.9 0 0 1 .46-.13l.25.04c.89.25 1.84.4 2.83.4l.48-.02a5.59 5.59 0 0 1-.29-1.77c0-3.64 3.54-6.6 7.91-6.6l.47.02C16.6 4.94 13 2.3 8.67 2.3zm5.7 11.7a.96.96 0 1 1 0-1.92.96.96 0 0 1 0 1.93zm4.81 0a.96.96 0 1 1 0-1.92.96.96 0 0 1 0 1.93zM5.78 8.38a1.16 1.16 0 1 1 0-2.31 1.16 1.16 0 0 1 0 2.3zm5.79 0a1.16 1.16 0 1 1 0-2.31 1.16 1.16 0 0 1 0 2.3z" />
        </Icon>
        <FadeTransition
          in={this.state.hover}
          mountOnEnter
          unmountOnExit
          timeout={250}
        >
          <QRToolTip>
            <img src="http://files.artsy.net/images/wechat_qr_logo.png" />
          </QRToolTip>
        </FadeTransition>
      </WeChatContainer>
    )
  }
}

const QR_SIZE = 125
const QR_PADDING = space(2)
const QR_CONTAINER_SIZE = QR_SIZE + QR_PADDING * 2

const QRToolTip = styled.div`
  position: absolute;
  bottom: calc(100% + ${space(2)}px);
  width: ${QR_CONTAINER_SIZE}px;
  height: ${QR_CONTAINER_SIZE}px;
  right: ${(-1 * QR_SIZE) / 2}px;
  border: 1px solid ${color("black10")};
  padding: ${QR_PADDING}px;
  background-color: white;
  box-shadow: 0 10px 20px ${color("black10")};

  &::after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid white;
    bottom: -9px;
    right: calc(50% - 8px);
  }

  img {
    width: ${QR_SIZE};
    height: ${QR_SIZE};
  }
`

const WeChatContainer = styled.a`
  position: relative;
  cursor: pointer;
`
