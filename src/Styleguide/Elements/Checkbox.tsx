// TODO: This and <Radio /> can be shared

import Icon from "Components/Icon"
import React from "react"
import styled from "styled-components"
import { Flex } from "./Flex"

import {
  border,
  BorderProps,
  SizeProps,
  space,
  SpaceProps,
} from "styled-system"

export interface CheckboxProps {
  selected?: boolean
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
    this.setState({ selected: !this.state.selected })
  }

  render() {
    const { selected } = this.state
    const { children } = this.props

    return (
      <Flex my={0.5} onClick={this.toggleSelected}>
        <CheckboxButton border={1} mr={1} selected={selected}>
          {selected && (
            <Icon
              name="check"
              color="white"
              fontSize="11px"
              top={-3}
              left={-3}
            />
          )}
        </CheckboxButton>
        <Label>{children}</Label>
      </Flex>
    )
  }
}

const CheckboxButton = styled.div.attrs<CheckboxToggleProps>({})`
  ${border};
  ${space};

  ${props => {
    const {
      selected,
      theme: {
        colors: { black100, black10, white100 },
        space,
      },
    } = props

    const backgroundColor = selected ? black100 : white100
    const borderColor = selected ? black100 : black10
    const buttonSize = space[2]

    return `
      background-color: ${backgroundColor};
      border-color: ${borderColor};
      width: ${buttonSize}px;
      height: ${buttonSize}px;
      cursor: pointer;
    `
  }};
`

const Label = styled.div`
  cursor: pointer;
  user-select: none;
`
