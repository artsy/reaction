import { Flex } from "@artsy/palette"
import { ModalManager } from "Components/Authentication/Desktop/ModalManager"
import { ModalType } from "Components/Authentication/Types"
import Icon from "Components/Icon"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Share } from "./Share"

const ActionIconWrapper = styled(Flex)`
  position: relative;
  justify-content: center;
`

const boundedSubmit = (type, options, values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 1))
    actions.setSubmitting(false)
  }, 1000)
}

export class SaveActionIcon extends React.Component {
  private manager: ModalManager | null

  constructor(props: ShareActionIconProps) {
    super(props)
  }

  handleClick = () => {
    this.manager.openModal({ mode: ModalType.signup })
  }

  render() {
    return (
      <ActionIconWrapper>
        <Icon
          name="heart"
          color="black100"
          cursor="pointer"
          onClick={this.handleClick}
        />
        <ModalManager
          ref={ref => (this.manager = ref)}
          submitUrls={{
            login: "/login",
            signup: "/signup",
            forgot: "/forgot",
          }}
          handleSubmit={boundedSubmit}
        />
      </ActionIconWrapper>
    )
  }
}

interface ShareActionIconProps {
  handleClick?: () => void
}

interface ShareActionIconState {
  isOpen: boolean
}

const ShareWidgetWrapper = styled.div`
  position: absolute;
  bottom: 40px;
`

export class ShareActionIcon extends React.Component<
  ShareActionIconProps,
  ShareActionIconState
> {
  private open: () => void
  private close: () => void

  constructor(props: ShareActionIconProps) {
    super(props)

    if (this.props.handleClick) {
      this.open = this.props.handleClick
    } else {
      this.open = () => {
        this.setState({ isOpen: true })
      }
    }

    this.close = () => {
      this.setState({ isOpen: false })
    }

    this.state = {
      isOpen: false,
    }
  }

  render() {
    return (
      <ActionIconWrapper>
        {this.state.isOpen && (
          <ShareWidgetWrapper>
            <Share url={sd.APP_URL} handleClose={this.close} />
          </ShareWidgetWrapper>
        )}
        <Icon
          name="share"
          color="black100"
          cursor="pointer"
          onClick={this.open}
        />
      </ActionIconWrapper>
    )
  }
}
