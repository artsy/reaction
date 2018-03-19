import React from "react"
import styled from "styled-components"
import * as fonts from "../Assets/Fonts"
import { block } from "./Helpers"
import { border, borderedInput } from "./Mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean
  block?: boolean
  leftView?: JSX.Element
  rightView?: JSX.Element
  errorMessage?: string
}

interface InputState {
  borderClasses: string
}

const StyledInput = styled.input`
  ${borderedInput};
  ${block(24)};
`

const BorderlessInput = styled.input`
  border: 0;
  ${fonts.secondary.style};
  font-size: 17px;
  outline: none;
  flex: 1;
`

const StyledDiv = styled.div`
  ${borderedInput};
  border: 0;
  padding: 12px;
  margin-right: 0;
  display: flex;
  position: relative;

  & .border-container {
    z-index: -1;
    ${border};
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    top: 0;
    left: 0;
  }
`

const BorderClassname = "border-container"

class Input extends React.Component<InputProps, InputState> {
  state = {
    borderClasses: BorderClassname,
    value: "",
  }

  //////// Trying to activate html5 native validations... I think it works
  public inputEl:
    | any // types don't work
    | React.ReactHTMLElement<HTMLInputElement>
    | React.Component<any, any>

  componentDidUpdate() {
    console.log(this.props.errorMessage)
    if (
      this.props.errorMessage &&
      this.inputEl &&
      this.inputEl.setCustomValidity
    ) {
      this.inputEl.setCustomValidity(this.props.errorMessage)
    }
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

  render() {
    if (this.props.leftView && this.props.rightView) {
      const { className, ref, ...newProps } = this.props

      return (
        <StyledDiv>
          <div className={this.state.borderClasses} />
          {this.props.leftView}
          <BorderlessInput
            {...newProps}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            value={this.props.value}
            innerRef={input => (this.inputEl = input)}
          />
          {this.props.rightView}
        </StyledDiv>
      )
    } else if (this.props.rightView) {
      const { className, ref, ...newProps } = this.props

      return (
        <StyledDiv>
          <div className={this.state.borderClasses} />
          <BorderlessInput
            {...newProps}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            value={this.props.value}
            innerRef={input => (this.inputEl = input)}
          />
          {this.props.rightView}
        </StyledDiv>
      )
    } else if (this.props.leftView) {
      const { className, ref, ...newProps } = this.props

      return (
        <StyledDiv>
          <div className={this.state.borderClasses} />
          {this.props.leftView}
          <BorderlessInput
            {...newProps}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            value={this.props.value}
            innerRef={input => (this.inputEl = input)}
          />
        </StyledDiv>
      )
    }

    return (
      <StyledInput
        innerRef={input => (this.inputEl = input)}
        {...this.props as any}
      />
    )
  }
}

export default Input
