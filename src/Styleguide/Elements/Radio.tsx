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

export interface RadioProps {
  selected?: boolean
  disabled?: boolean
  hover?: boolean
  onSelect?: (selected: boolean) => void
  value?: string
}

export interface RadioToggleProps
  extends RadioProps,
    BorderProps,
    SizeProps,
    SpaceProps {}

export class Radio extends React.Component<RadioProps> {
  render() {
    const { selected, children, disabled, hover } = this.props

    return (
      <Container
        disabled={disabled}
        my={0.3}
        alignItems="center"
        selected={selected}
        hover={hover}
        onClick={() => !this.props.disabled && this.props.onSelect(!selected)}
      >
        <RadioButton border={1} mr={1} selected={selected} disabled={disabled}>
          <InnerCircle />
        </RadioButton>
        <Label style={disabled && { color: color("black10") }}>
          {children}
        </Label>
      </Container>
    )
  }
}

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

const Label = styled.div``

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
