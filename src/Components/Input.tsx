import React from "react"
import styled from "styled-components"
import { fadeIn, fadeOut } from "../Assets/Animations"
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

const StyledDiv = styled.div.attrs<{ hasLabel?: boolean }>({})`
  ${borderedInput};
  border: 0;
  padding: ${p => (p.hasLabel ? "16px" : "12px")};
  margin-right: 0;
  margin-top: 5px;
  margin-bottom: 5px;
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

const Label = styled.label.attrs<{ out: boolean }>({})`
  ${fonts.primary.style};
  font-size: 8px;
  position: absolute;
  left: 17px;
  top: 8px;
  visibility: ${props => (props.out ? "hidden" : "visible")};
  animation: ${props => (props.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 0.2s linear;
`

const ShowHide = styled.a`
  ${fonts.primary.style};
  font-size: 12px;
`

const ShowHideButton = props => {
  const text = props.show ? "Hide" : "Show"
  return <ShowHide>{text}</ShowHide>
}

const BorderClassname = "border-container"

class Input extends React.Component<InputProps, InputState> {
  state = {
    borderClasses: BorderClassname,
    value: "",
  }

  onFocus = e => {
    this.setState({
      borderClasses: `${BorderClassname} focused`,
    })

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onBlur = e => {
    this.setState({
      borderClasses: BorderClassname,
    })

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  onChange = e => {
    this.setState({
      value: e.currentTarget.value,
    })
  }

  render() {
    let rightView = this.props.rightView
    const { leftView, label, type } = this.props
    const showLabel = !!this.state.value && !!label

    if (type === "password") {
      rightView = <ShowHideButton />
    }

    if (leftView || rightView || label) {
      const { className, ref, ...newProps } = this.props

      return (
        <StyledDiv hasLabel={!!label}>
          <div className={this.state.borderClasses} />
          <Label out={!showLabel}>{label}</Label>
          {!!leftView && leftView}
          <BorderlessInput
            {...newProps}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyUp={this.onChange}
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
