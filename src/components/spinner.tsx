import * as React from "react"

import styled, { keyframes } from "styled-components"

interface Props extends React.HTMLProps<Spinner> {
  width?: number
  height?: number
}

export class Spinner extends React.Component<Props, null> {
  render() {
    return <div className={this.props.className} />
  }
}

const spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

const StyledSpinner = styled(Spinner)`
  background: black;
  animation: ${spin} 1s infinite linear;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: absolute;
  top: calc(50% - ${props => props.height}px / 2);
  left: calc(50% - ${props => props.width}px / 2);
`

StyledSpinner.defaultProps = {
  width: 25,
  height: 6,
}

export default StyledSpinner
