import * as React from "react"
import styled, { css } from "styled-components"
import colors from "../../assets/colors"
import * as fonts from "../../assets/fonts"
import { block } from "../helpers"
import Icon from "../icon"

export interface ButtonProps extends React.HTMLProps<Button> {
  state?: ButtonState
  block?: boolean
  icon?: Icon
}

export enum ButtonState {
  Default,
  Loading,
  Success,
  Failure,
}

class Button extends React.Component<ButtonProps, any> {
  public static defaultProps: ButtonProps

  render(): JSX.Element {
    const newProps: any = { ...this.props }
    delete newProps.state
    delete newProps.block

    return this.props.href
      ? (
        <a className={ this.props.className } { ...newProps }>
          { this.props.icon }
          { this.props.children }
        </a>
      ) : (
        <button className={ this.props.className } { ...newProps }>
          { this.props.icon }
          { this.props.children }
        </button>
      )
  }
}

export const StyledButton = styled(Button)`
  background: ${props => {
    if (props.state === ButtonState.Success) return colors.greenRegular
    if (props.state === ButtonState.Failure) return colors.redRegular

    return colors.grayRegular
  }};
  color: ${props => {
    if (props.disabled) return "rgba(0,0,0,0.5)"
    if (props.state !== ButtonState.Default) return "white"
    return "black"
  }};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  font-size: 13px;
  line-height: 1;
  outline: 0;
  transition: background-color .25s,color .25s;
  margin: 10px;
  border: none;

  &:hover:not(:disabled) {
    background: ${props => {
      if (props.state === ButtonState.Success) return colors.greenBold
      if (props.state === ButtonState.Failure) return colors.redBold

      return colors.grayMedium
    }};
  }

  ${fonts.primary.style}
  ${block()}
`

StyledButton.defaultProps = {
  state: ButtonState.Default,
  block: false,
}

export default StyledButton
