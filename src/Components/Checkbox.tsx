import React, { Component, HTMLProps } from "react"
import styled from "styled-components"
import colors from "../Assets/Colors"

interface CheckboxState {
  checked: boolean
}

export class Checkbox extends Component<HTMLProps<Checkbox>, CheckboxState> {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked || false,
    }
  }

  onChange = event => {
    if (this.props.onChange) {
      this.props.onChange(event)
    }

    this.setState({
      checked: event.currentTarget.checked,
    })
  }

  render() {
    const { children, className, ...propsForCheckbox } = this.props

    return (
      <Label className={className}>
        <CheckboxInput
          type="checkbox"
          {...propsForCheckbox as any}
          onChange={this.onChange}
          checked={this.state.checked}
        />

        {children}
      </Label>
    )
  }
}

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  position: relative;
  top: -1px;
  margin: 0 0.5rem 0 0;

  // The before represents the check mark
  &:before {
    transform: rotate(-45deg);
    content: "";
    position: absolute;
    z-index: 1;
    top: 5px;
    left: 4px;
    width: 0.6rem;
    height: 0.3rem;
    border: 2px solid ${colors.black};
    border-top-style: none;
    border-right-style: none;
    transition: opacity 0.25s;
    opacity: 0;
  }

  &:hover:before {
    opacity: 0.1;
  }

  &:checked:before {
    opacity: 1;
  }

  // The after represents the square box
  &:after {
    content: "";
    position: absolute;
    left: 0;
    width: 1rem;
    height: 1rem;
    background: ${colors.white};
    border: 2px solid ${colors.grayRegular};
  }

  &:disabled {
    &:hover:before {
      border-color: transparent;
    }

    &:checked {
      &:before {
        border-color: ${colors.grayDark};
      }
    }

    &:after {
      background-color: ${colors.grayRegular};
    }
  }
`

const Label = styled.label`
  position: relative;
  line-height: 135%;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export default Checkbox
