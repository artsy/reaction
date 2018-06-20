import { Sans } from "@artsy/palette"
import { pick } from "lodash/fp"
import React, { Component, ReactNode } from "react"
import styled, { css } from "styled-components"

import {
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  height,
  HeightProps,
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

export const Button = styled(
  class extends Component<ButtonProps> {
    static defaultProps = {
      size: ButtonSize.default,
      variant: ButtonVariant.default,
    }

    getSize() {
      const { size } = this.props

      switch (size) {
        case ButtonSize.small:
          return { height: "26px", size: 2, px: 1 }
        case ButtonSize.medium:
          return { height: "40px", size: "3t", px: 2 }
        case ButtonSize.large:
          return { height: "50px", size: "3t", px: 3 }
        default:
      }
    }

    getVariant() {
      const { variant } = this.props

      switch (variant) {
        case ButtonVariant.primaryBlack:
          return css`
            ${props => {
              const { colors } = props.theme

              return `
                background-color: ${colors.black100};
                border-color: ${colors.black100};
                color: ${colors.white100};

                &:hover {
                  background-color: ${colors.purple100};
                  border-color: ${colors.purple100};
                  color: ${colors.white100};
                }
              `
            }};
          `
        case ButtonVariant.primaryWhite:
          return css`
            ${props => {
              const { colors } = props.theme

              return `
                background-color: ${colors.white100};
                border-color: ${colors.white100};
                color: ${colors.black100};

                &:hover {
                  background-color: ${colors.purple100};
                  border-color: ${colors.purple100};
                  color: ${colors.white100};
                }
              `
            }};
          `
        case ButtonVariant.secondaryGray:
          return css`
            ${props => {
              const { colors } = props.theme

              return `
              background-color: ${colors.black10};
              border-color: ${colors.black10};
              color: ${colors.black100};

              &:hover {
                background-color: ${colors.black30};
                border-color: ${colors.black30};
                color: ${colors.black100};
              }
            `
            }};
          `
        case ButtonVariant.secondaryOutline:
          return css`
            ${props => {
              const { colors } = props.theme

              return `
                background-color: ${colors.white100};
                border-color: ${colors.black10};
                color: ${colors.black100};

                &:hover {
                  background-color: ${colors.white100};
                  border-color: ${colors.black100};
                  color: ${colors.black100};
                }
              `
            }};
          `
        default:
      }
    }

    render() {
      const buttonProps = {
        ...this.props,
        ...this.getSize(),
        variantStyles: this.getVariant(),
      }

      return <ButtonBase {...buttonProps}>{this.props.children}</ButtonBase>
    }
  }
)`
  ${space};
`

export interface ButtonBaseProps
  extends BorderProps,
    BorderRadiusProps,
    SpaceProps,
    TextAlignProps,
    WidthProps,
    HeightProps {
  variantStyles?: any // FIXME: Type to styled.css
}

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
        <Sans weight="medium" {...textProps} pt="1px">
          {children}
        </Sans>
      </Container>
    )
  }
}

const Container = styled.button.attrs<ButtonBaseProps>({})`
  ${border};
  ${borderRadius};
  ${space};
  ${textAlign};
  ${width};
  ${height};

  cursor: pointer;
  transition: 0.25s ease;

  ${p => p.variantStyles};
`
