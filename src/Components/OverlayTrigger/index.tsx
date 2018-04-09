import React, { cloneElement, ReactInstance } from "react"
import { Overlay } from "react-overlays"
import styled from "styled-components"

import { OverlayTriggerProps } from "./types"

export class OverlayTrigger extends React.Component<OverlayTriggerProps> {
  private target: ReactInstance

  render() {
    const { overlay, children, ...props } = this.props

    return (
      <Container>
        <Container ref={element => (this.target = element)}>
          {children}
        </Container>

        <Overlay target={this.target} {...props}>
          {cloneElement(overlay, {
            ...overlay.props,
            style: {
              ...overlay.props.style,
              position: "absolute",
            },
          })}
        </Overlay>
      </Container>
    )
  }
}

const Container = styled.div`
  display: inline-block;
`
