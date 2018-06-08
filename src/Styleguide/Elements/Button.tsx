import React, { Component, ReactNode } from "react"
import styled from "styled-components"
import { Sans, TypographyProps } from "@artsy/palette"
import { pick } from "lodash/fp"

import {
  border,
  BorderProps,
  borderColor,
  BorderColorProps,
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from "styled-system"

enum ButtonSize {
  default = "default",
  large = "large",
  small = "small",
}

enum ButtonVariant {
  default = "default",
  outline = "outline",
}

export interface ButtonProps extends ButtonBaseProps {
  children: ReactNode
  size?: any // FIXME, ButtonSize
  variant?: any // FIXME, ButtonVariant?
}

export class Button extends Component<ButtonProps> {
  static defaultProps = {
    size: ButtonSize.default,
    variant: ButtonVariant.default,
  }

  getSize() {
    const { size } = this.props

    switch (size) {
      case ButtonSize.large:
        return { size: 3, px: 4, py: 3 }
      case ButtonSize.small:
        return { size: 1, px: 3, py: 1 }
      default:
        return { size: 2, px: 4, py: 3 }
    }
  }

  getVariant() {
    const { variant } = this.props

    switch (variant) {
      case ButtonVariant.outline:
        return {
          bg: "white100",
          border: 1,
          borderColor: "black10",
        }
      default:
        return {
          bg: "black100",
          border: 1,
          borderColor: "black100",
          color: "white100",
        }
    }
  }

  render() {
    const buttonProps = {
      ...this.props,
      ...this.getSize(),
      ...this.getVariant(),
    }

    return <ButtonBase {...buttonProps}>{this.props.children}</ButtonBase>
  }
}

export interface ButtonBaseProps
  extends BorderProps,
    BorderColorProps,
    BorderRadiusProps,
    ColorProps,
    SpaceProps,
    TextAlignProps,
    TypographyProps,
    WidthProps {}

export class ButtonBase extends Component<ButtonBaseProps> {
  static defaultProps = {
    border: 0,
    borderRadius: 3,
  }

  render() {
    const { children, ...rest } = this.props
    const textProps = pick(["color", "size", "weight"], rest)

    return (
      <Container {...rest}>
        <Sans {...textProps}>{children}</Sans>
      </Container>
    )
  }
}

const Container = styled.button.attrs<ButtonBaseProps>({})`
  ${border};
  ${borderColor};
  ${borderRadius};
  ${color};
  ${space};
  ${width};
  ${textAlign};

  cursor: pointer;
  text-transform: uppercase;

  &:focus {
    outline: 0;
  }
`
