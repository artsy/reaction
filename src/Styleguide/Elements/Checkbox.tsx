import { color, space } from "@artsy/palette"
import React from "react"
import styled, { css } from "styled-components"
import {
  BorderProps,
  borders,
  SizeProps,
  space as styledSpace,
  SpaceProps,
} from "styled-system"
import { Flex, FlexProps } from "./Flex"

const SIZE = 2
const BORDER_WIDTH = 2

export interface CheckboxProps {
  disabled?: boolean
  selected?: boolean
  error?: boolean
  /**
   * Used to force the checkbox into the visual hover state. Useful for testing.
   */
  hover?: boolean
  onSelect?: any
}

export interface CheckboxState {
  selected: boolean
}

export interface CheckboxToggleProps
  extends CheckboxProps,
    BorderProps,
    SizeProps,
    SpaceProps {}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
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

  labelColor = () => {
    const { disabled, error } = this.props
    if (disabled) return { color: color("black10") }
    if (error) return { color: color("red100") }
  }

  iconColor = () => {
    const { disabled, selected } = this.props
    if (disabled && selected) {
      return color("black30")
    } else if (disabled) {
      return color("black5")
    }
    return color("white100")
  }

  render() {
    const { selected } = this.state
    const { children, error, disabled, hover } = this.props

    return (
      <Container
        className={hover && "hover"}
        my={0.5}
        onClick={() => this.toggleSelected()}
        selected={selected}
        hover={hover}
        disabled={disabled}
        alignItems="center"
      >
        <CheckboxButton
          border={1}
          mr={1}
          selected={selected}
          error={error}
          disabled={disabled}
        >
          <Check color={this.iconColor()} />
        </CheckboxButton>
        <Label style={this.labelColor()}>{children}</Label>
      </Container>
    )
  }
}

const StyledSvg = styled.svg`
  position: relative;
  top: -${BORDER_WIDTH}px;
  left: -${BORDER_WIDTH}px;
`

const Check = ({ color }) => (
  <StyledSvg
    width={`${space(SIZE)}px`}
    height={`${space(SIZE)}px`}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" stroke={color} stroke-width="2" d="M4 9.7L8.2 14 16 6" />
  </StyledSvg>
)

const checkBorderColor = ({ disabled, selected, error, hover }) => {
  if (disabled) return color("black10")
  if (selected) return color("black100")
  if (error) return color("red100")
  return color("black10")
}

const checkBackgroundColor = ({ disabled, selected }) => {
  switch (true) {
    case disabled:
      return color("black5")
    case selected:
      return color("black100")
    default:
      return color("white100")
  }
}

const CheckboxButton = styled.div.attrs<CheckboxToggleProps>({})`
  ${borders};
  ${styledSpace};
  background-color: ${checkBackgroundColor};
  border-color: ${checkBorderColor};
  width: ${space(SIZE)}px;
  height: ${space(SIZE)}px;
`

const Label = styled.div``

const hoverStyles = ({ selected, hover, disabled }) => {
  const hoverStyles = `
    background-color: ${color("black10")};
    border-color: ${color("black10")};
  `
  if (hover && !selected && !disabled) {
    return css`
      ${CheckboxButton} {
        ${hoverStyles};
      }
    `
  }
  if (!selected && !disabled) {
    return css`
      &:hover ${CheckboxButton} {
        ${hoverStyles};
      }
    `
  }
}

interface ContainerProps extends FlexProps {
  selected: boolean
  hover: boolean
}
const Container = styled(Flex).attrs<ContainerProps>({})`
  user-select: none;
  cursor: ${({ disabled }) => !disabled && "pointer"};
  ${hoverStyles};
`
