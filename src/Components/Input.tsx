import React from "react"
import styled from "styled-components"
import * as fonts from "../Assets/Fonts"
import { block } from "./Helpers"
import { border, borderedInput } from "./Mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean
  block?: boolean
  label?: string
  leftView?: JSX.Element
  rightView?: JSX.Element
}

interface InputState {
  borderClasses: string
  value: string
}

const StyledInput = styled.input`
  ${borderedInput};
  ${block(24)};
`

const BorderlessInput = styled.input`
  ${fonts.secondary.style};
  border: 0;
  font-size: 17px;
  outline: none;
  flex: 1;
`

interface StyledDivProps {
  hasLabel?: boolean
}

const StyledDiv = styled.div.attrs<StyledDivProps>({
  hasLabel: false,
})`
  ${borderedInput};
  border: 0;
  padding: ${p => (p.hasLabel ? "15px" : "12px")};
  margin-right: 0;
  display: flex;
  position: relative;

  & .border-container {
    ${border};
    z-index: -1;
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    top: 0;
    left: 0;
  }
`

const Label = styled.label`
  ${fonts.primary.style};
  font-size: 8px;
  position: absolute;
  left: 16px;
  top: 8px;
`

const BorderClassname = "border-container"

class Input extends React.Component<InputProps, InputState> {
  state = {
    borderClasses: BorderClassname,
    value: "",
  }

  onFocus(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      borderClasses: `${BorderClassname} focused`,
    })

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      borderClasses: BorderClassname,
    })

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  onChange(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      value: e.currentTarget.value,
    })
  }

  render() {
    const { leftView, rightView, label } = this.props
    const showLabel = !!this.state.value && !!label

    if (leftView || rightView || label) {
      const { className, ref, ...newProps } = this.props

      return (
        <StyledDiv hasLabel={showLabel}>
          <div className={this.state.borderClasses} />
          {showLabel && <Label>{label}</Label>}
          {!!leftView && leftView}
          <BorderlessInput
            {...newProps}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onKeyUp={this.onChange.bind(this)}
            value={this.props.value}
          />
          {!!rightView && rightView}
        </StyledDiv>
      )
    }

    return <StyledInput {...this.props as any} />
  }
}

export default Input
