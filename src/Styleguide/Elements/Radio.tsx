import React from "react"
import styled, { css } from "styled-components"
import { Flex, FlexProps } from "./Flex"

import { color, space } from "@artsy/palette"

import {
  BorderProps,
  borders,
  SizeProps,
  space as styledSpace,
  SpaceProps,
} from "styled-system"

export interface RadioProps extends FlexProps {
  selected?: boolean
  disabled?: boolean
  hover?: boolean
  onSelect?: (selected: boolean) => void
  value?: string
  name?: string
}

export interface RadioToggleProps
  extends RadioProps,
    BorderProps,
    SizeProps,
    SpaceProps {}

export const Radio = styled(
  class Radio extends React.Component<RadioProps> {
    render() {
      const {
        selected,
        name,
        children,
        disabled,
        hover,
        onSelect,
        ...others
      } = this.props

      return (
        <Container
          disabled={disabled}
          alignItems="center"
          selected={selected}
          hover={hover}
          onClick={() => !disabled && onSelect && onSelect(!selected)}
          {...others}
        >
          <RadioButton
            role="presentation"
            border={1}
            mr={1}
            selected={selected}
            disabled={disabled}
          >
            <InnerCircle />
          </RadioButton>
          <HiddenInput
            type="radio"
            name={name}
            checked={selected}
            disabled={disabled}
            onChange={() => !disabled && onSelect && onSelect(!selected)}
          />
          <Label htmlFor={name} disabled={disabled}>
            {children}
          </Label>
        </Container>
      )
    }
  }
).attrs<RadioProps>({})``

const hoverStyles = ({ selected, hover }) => {
  const styles = `background-color: ${color("black10")};`
  if (hover && !selected) {
    return css`
      ${RadioButton} {
        ${styles};
      }
    `
  }
  if (!selected) {
    return css`
      &:hover ${RadioButton} {
        ${styles};
      }
    `
  }
}

interface ContainerProps extends FlexProps {
  disabled: boolean
  hover: boolean
  selected: boolean
}
const Container = styled(Flex).attrs<ContainerProps>({})`
  cursor: ${({ disabled }) => !disabled && "pointer"};
  user-select: none;
  ${hoverStyles};
`

const Label = styled.label`
  display: block;
  cursor: pointer;
  ${({ disabled }: { disabled: boolean }) =>
    disabled &&
    css`
      cursor: inherit;
      color: ${color("black10")};
    `};
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`

const InnerCircle = styled.div`
  width: ${space(1)}px;
  height: ${space(1)}px;
  border-radius: 50%;
  position: relative;
  left: 3px;
  top: 3px;
  background-color: ${color("white100")};
`

const radioBackgroundColor = ({ disabled, selected }) => {
  switch (true) {
    case disabled:
      return color("black10")
    case selected:
      return color("black100")
    default:
      return color("white100")
  }
}

const radioBorderColor = ({ disabled, selected }) =>
  selected && !disabled ? color("black100") : color("black10")

const disabledInnerCircleBackgroundColor = ({ disabled, selected }) =>
  disabled && !selected && color("black10")

const RadioButton = styled.div.attrs<RadioToggleProps>({})`
  ${borders};
  ${styledSpace};
  background-color: ${radioBackgroundColor};
  border-color: ${radioBorderColor};
  width: ${space(2)}px;
  height: ${space(2)}px;
  border-radius: 50%;
  transition: background-color 0.25s, border-color 0.25s;
  ${InnerCircle} {
    background-color: ${disabledInnerCircleBackgroundColor};
  }
`
