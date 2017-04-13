import * as React from "react"

import styled from "styled-components"
import colors from "../assets/colors"

interface Props extends React.HTMLProps<Checkbox> {
  checked: boolean
}

export class Checkbox extends React.Component<Props, null> {
  static defaultProps = {
    checked: true,
  }

  render() {
    const { checked } = this.props

    return (
      <div className={this.props.className}>
        <CheckboxInput type="checkbox" checked={checked} />
        <Label />
      </div>
    )
  }
}

const StyledCheckbox = styled(Checkbox)`
  width: 20px;
  height: 20px;
  position: relative;
  user-select: none;
  background: ${colors.grayMedium};
  display: inline-block;
`

const CheckboxInput = styled.input`
  visibility: hidden;
  &:checked + label:after {
    opacity: 1 !important;
  }
`

const Label = styled.label`
  cursor: pointer
  position: absolute
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  background-color: white;
  &:after {
    content: '';
    position: absolute;
    top: 3px;
    right: 2px;
    bottom: 7px;
    left: 2px;
    border: 2px solid black;
    border-top: none;
    border-right: none;
    opacity: 0;
    transform: rotate(-45deg) translateZ(0);
    transition: opacity 0.25s;
  }
`

export default StyledCheckbox
