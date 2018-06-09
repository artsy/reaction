import React, { Component, ReactNode } from "react"
import styled from "styled-components"
import { themeGet } from "styled-system"
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
  default = "medium",
  small = "small",
  medium = "medium",
  large = "large",
}

enum ButtonVariant {
  default = "primaryBlack",
  primaryBlack = "primaryBlack",
  primaryWhite = "primaryWhite",
  secondaryGray = "secondaryGray",
  secondaryOutline = "secondaryOutline",
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
      case ButtonSize.small:
        return { size: 1, px: 3, py: 1 }
      case ButtonSize.medium:
        return { size: 2, px: 4, py: 3 }
      case ButtonSize.large:
        return { size: 3, px: 5, py: 3 }
      default:
    }
  }

  getVariant() {
    const { variant } = this.props

    switch (variant) {
      case ButtonVariant.primaryBlack:
        return {
          bg: "black100",
          color: "white100",
          borderColor: "black100",
        }
      case ButtonVariant.primaryWhite:
        return {
          bg: "white100",
          color: "black100",
          borderColor: "white100",
        }
      case ButtonVariant.secondaryOutline:
        return {
          bg: "white100",
          color: "black100",
          borderColor: "black10",
        }
      default:
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
    border: 1,
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

  &:hover {
    background-color: ${themeGet("colors.purple100")};
    border-color: ${themeGet("colors.purple100")};
    color: ${themeGet("colors.white100")};

    ${Sans} {
      color: ${themeGet("colors.white100")};
    }

    transition: all 250ms ease-out 0s;
  }
`
