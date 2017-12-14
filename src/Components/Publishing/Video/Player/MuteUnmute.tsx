import React from "react"
import styled from "styled-components"
import { IconVideoMute } from "../../Icon/IconVideoMute"
import { IconVideoUnmute } from "../../Icon/IconVideoUnmute"

interface Props extends React.HTMLProps<HTMLSpanElement> {
  isMuted: boolean
  toggleMute: () => void
}

export class MuteUnmute extends React.PureComponent<Props, null> {
  render() {
    const {
      isMuted,
      toggleMute
    } = this.props

    return (
      <MuteUnmuteContainer onClick={toggleMute}>
        {isMuted ?
          <IconVideoMute color="white"/>
          :
          <IconVideoUnmute color="white"/>
        }
      </MuteUnmuteContainer>
    )
  }
}

export const MuteUnmuteContainer = styled.div`
  height: 28px;
`
