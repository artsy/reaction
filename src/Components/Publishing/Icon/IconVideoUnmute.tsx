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
      <path
        d="M29.514 28L19.13 17.614 9.557 8.043 1.514 0 0 1.514l6.529 6.529H.757V21.47H11.83l7.3 7.286v-8.114L28 29.514zM19.129.757l-7.3 7.286 7.3 7.3z"
      />
    </g>
  </svg>
)

Icon.defaultProps = {
  color: "black"
}

export const IconVideoUnmute = styled(Icon) `
  width: 32px;
  height: 32px;
`
