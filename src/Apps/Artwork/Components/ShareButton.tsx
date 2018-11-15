import { color, Flex } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Share } from "./Share"

const ShareIconWrapper = styled(Flex)`
  position: relative;
  justify-content: center;
`

const ShareIcon = styled(Icon)`
  color: ${color("black100")};
  cursor: pointer;
`

const ShareWidgetWrapper = styled.div`
  position: absolute;
  bottom: 40px;
`

interface State {
  isOpen: boolean
}

export class ShareButton extends React.Component<any, State> {
  private close: () => void

  constructor(props: any) {
    super(props)

    this.close = () => {
      this.setState({ isOpen: false })
    }

    this.state = {
      isOpen: false,
    }

    this.open = this.open.bind(this)
  }

  open() {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <ShareIconWrapper>
        {this.state.isOpen && (
          <ShareWidgetWrapper>
            <Share url={sd.APP_URL} handleClose={this.close} />
          </ShareWidgetWrapper>
        )}
        <ShareIcon name="share" onClick={this.open} />
      </ShareIconWrapper>
    )
  }
}
