import React, { Component } from "react"
import styled from "styled-components"
import { IconVideoMute } from "../Icon/IconVideoMute"
import { IconVideoUnmute } from "../Icon/IconVideoUnmute"

interface Props extends React.HTMLProps<HTMLSpanElement> {
  isMuted: boolean
  toggleMute: () => void
}

export class MuteUnmute extends Component<Props, null> {
  shouldComponentUpdate(nextProps) {
    return this.props.isMuted !== nextProps.isMuted
  }

  render() {
    const {
      isMuted,
      toggleMute
    } = this.props

    return (
      <MuteUnmuteContainer onClick={toggleMute}>
        {isMuted ?
          <IconVideoMute />
          :
          <IconVideoUnmute />
        }
      </MuteUnmuteContainer>
    )
  }
}

export const MuteUnmuteContainer = styled.div`
  height: 28px;
`
