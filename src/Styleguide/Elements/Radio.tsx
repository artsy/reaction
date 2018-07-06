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
  onSelect?: any
  value?: string
}

export interface RadioState {
  selected: boolean
}

export interface RadioToggleProps
  extends RadioProps,
    BorderProps,
    SizeProps,
    SpaceProps {}

export class Radio extends React.Component<RadioProps, RadioState> {
  state = {
    selected: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: props.selected || this.state.selected,
    }
  }

  toggleSelected = () => {
    const selected = !this.state.selected

    this.setState({
      selected,
    })

    if (this.props.onSelect) {
      this.props.onSelect(selected)
    }
  }

  render() {
    const { selected } = this.state
    const { children, disabled, hover } = this.props

    return (
      <Container
        disabled={disabled}
        my={0.3}
        onClick={() => !this.props.disabled && this.toggleSelected()}
      >
        <RadioButton
          border={1}
          mr={1}
          selected={selected}
          disabled={disabled}
          hover={hover}
        >
          <InnerCircle />
        </RadioButton>
        <Label style={disabled && { color: color("black10") }}>
          {children}
        </Label>
      </Container>
    )
  }
}

interface ContainerProps extends FlexProps {
  disabled: boolean
}
const Container = styled(Flex).attrs<ContainerProps>({})`
  cursor: ${({ disabled }) => !disabled && "pointer"};
  user-select: none;
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

const hoverStyles = ({ hover, selected }) => {
  const styles = `background-color: ${color("black10")};`
  if (hover && !selected) return styles
  if (!selected)
    return css`
      &:hover {
        ${styles};
      }
    `
}

const RadioButton = styled.div.attrs<RadioToggleProps>({})`
  ${borders};
  ${styledSpace};
  background-color: ${radioBackgroundColor};
  border-color: ${radioBorderColor};
  width: ${space(2)}px;
  height: ${space(2)}px;
  border-radius: 50%;
  ${InnerCircle} {
    background-color: ${disabledInnerCircleBackgroundColor};
  }

  ${hoverStyles};
`
