import { Flex } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import styled from "styled-components"
import { Share } from "./Share"

const ActionIcon = styled(Icon)`
  cursor: pointer;
`

const ActionIconWrapper = styled(Flex)`
  position: relative;
  justify-content: center;
`

const ShareWidgetWrapper = styled.div`
  position: absolute;
  top: -226px;
`

export class SaveActionIcon extends React.Component {
  render() {
    return (
      <ActionIconWrapper>
        <ActionIcon name="heart" color="black100" />
      </ActionIconWrapper>
    )
  }
}

interface ShareActionIconState {
  isOpen: boolean
}

export class ShareActionIcon extends React.Component<
  any,
  ShareActionIconState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    return (
      <ActionIconWrapper>
        {this.state.isOpen && (
          <ShareWidgetWrapper>
            <Share url="http://example.com" />
          </ShareWidgetWrapper>
        )}
        <ActionIcon name="share" color="black100" onClick={this.toggle} />
      </ActionIconWrapper>
    )
  }
}
