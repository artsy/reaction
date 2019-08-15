import React from "react"
import styled from "styled-components"

interface SVGVideoBackgroundProps {
  id?: string
  url?: string
}

export const SVGVideoBackground = props => (
  <Video autoPlay loop muted playsInline controls={false} src={props.url} />
)

const Video = styled.video<SVGVideoBackgroundProps>`
  width: 100%;
  height: 100%;
  max-height: 95vh;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  clip-path: url(#clip-svg-intro);
`
