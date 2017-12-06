import React from "react"
import styled from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
}

const Icon: React.SFC<Props> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32px"
    height="32px"
  >
    <g fill={props.color}>
      <path d="M18 12.864V0l-7.152 7.286H0v13.428h10.848L18 28V12.864z" />
    </g>
  </svg>
)

Icon.defaultProps = {
  color: "black"
}

export const IconVideoMute = styled(Icon) `
  width: 32px;
  height: 32px;
`
