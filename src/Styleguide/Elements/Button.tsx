import { Sans, themeProps } from "@artsy/palette"
import { SansProps } from "@artsy/palette/dist/elements/Typography"
import Spinner from "Components/Spinner"
import React, { Component, ReactNode } from "react"
import styled, { css } from "styled-components"
import {
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  borders,
  height,
  HeightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from "styled-system"

export type ButtonSize = "small" | "medium" | "large"
const defaultSize: ButtonSize = "medium"

export type ButtonVariant =
  | "primaryBlack"
  | "primaryWhite"
  | "secondaryGray"
  | "secondaryOutline"
const defaultVariant: ButtonVariant = "primaryBlack"

export interface ButtonProps extends ButtonBaseProps {
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

export const Button = styled(
  class extends Component<ButtonProps> {
    static defaultProps = {
      size: defaultSize,
      variant: defaultVariant,
      theme: themeProps,
    }

    getSize(): { height: string; size: "2" | "3t"; px: number } {
      const { size } = this.props

      switch (size) {
        case "small":
          return { height: "26px", size: "2", px: 1 }
        case "medium":
          return { height: "41px", size: "3t", px: 2 }
        case "large":
          return { height: "50px", size: "3t", px: 3 }
        default:
      }
    }

    getVariant() {
      const { variant } = this.props

      switch (variant) {
        case "primaryBlack":
          return css`
            ${props => {
              const { colors } = props.theme

              return `
                background-color: ${colors.black100};
                border-color: ${colors.black100};
                color: ${colors.white100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.purple100};
                    border-color: ${colors.purple100};
                    color: ${colors.white100};
                  }
                }
              `
            }};
          `
        case "primaryWhite":
          return css`
            ${props => {
              const { colors } = props.theme

              return `
                background-color: ${colors.white100};
                border-color: ${colors.white100};
                color: ${colors.black100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.purple100};
                    border-color: ${colors.purple100};
                    color: ${colors.white100};
                  }
                }
              `
            }};
          `
        case "secondaryGray":
          return css`
            ${props => {
              const { colors } = props.theme

              return `
                background-color: ${colors.black10};
                border-color: ${colors.black10};
                color: ${colors.black100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.black30};
                    border-color: ${colors.black30};
                    color: ${colors.black100};
                  }
                }
              `
            }};
          `
        case "secondaryOutline":
          return css`
            ${props => {
              const { colors } = props.theme
              return `
                background-color: ${colors.white100};
                border-color: ${colors.black10};
                color: ${colors.black100};              
                
                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.white100};
                    border-color: ${colors.black100};
                    color: ${colors.black100};
                  }
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
        buttonSize: this.props.size,
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
  buttonSize?: ButtonSize
  loading?: boolean
  disabled?: boolean
  onClick?: (e) => void
  variantStyles?: any // FIXME
}

export class ButtonBase extends Component<ButtonBaseProps & SansProps> {
  static defaultProps = {
    border: 1,
    borderRadius: 3,
  }

  render() {
    const {
      children,
      loading,
      disabled,
      color,
      size,
      weight,
      ...rest
    } = this.props
    const loadingClass = loading ? "loading" : ""
    const disabledClass = disabled ? "disabled" : ""

    return (
      <Container {...rest} className={[loadingClass, disabledClass].join(" ")}>
        {loading && <Spinner spinnerSize={this.props.buttonSize} />}

        <Sans pt="1px" weight={weight || "medium"} color={color} size={size}>
          {children}
        </Sans>
      </Container>
    )
  }
}

const Container = styled.button.attrs<ButtonBaseProps>({})`
  position: relative;

  ${borders};
  ${borderRadius};
  ${space};
  ${textAlign};
  ${width};
  ${height};

  cursor: pointer;

  ${props => {
    if (!props.loading) {
      return `
        transition: 0.25s ease;
      `
    }
  }};

  ${props => props.variantStyles};

  &.loading {
    transition: none;
    background-color: transparent;
    color: transparent;
    border: 0;
  }

  &.disabled {
    ${props => {
      const { colors } = props.theme

      return `
        background-color: ${colors.black10};
        border-color: ${colors.black10};
        color: ${colors.white100};
        pointer-events: none;
      `
    }};
  }
`
