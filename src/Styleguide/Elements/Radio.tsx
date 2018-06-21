// TODO: This and <Checkbox /> can be shared

import React from "react"
import styled from "styled-components"
import { Flex } from "./Flex"

import {
  BorderProps,
  borders,
  SizeProps,
  space,
  SpaceProps,
} from "styled-system"

export interface RadioProps {
  selected?: boolean
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
    this.setState({ selected: !this.state.selected })
  }

  render() {
    const { selected } = this.state
    const { children } = this.props

    return (
      <Flex my={0.3} onClick={this.toggleSelected}>
        <RadioButton border={1} mr={1} selected={selected}>
          {selected && <InnerCircle />}
        </RadioButton>
        <Label>{children}</Label>
      </Flex>
    )
  }
}

const RadioButton = styled.div.attrs<RadioToggleProps>({})`
  ${borders};
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

      border-radius: 50%;
      cursor: pointer;
    `
  }};
`

const InnerCircle = styled.div`
  width: ${props => props.theme.space[1]}px;
  height: ${props => props.theme.space[1]}px;
  border-radius: 50%;
  background-color: white;
  position: relative;
  left: 3px;
  top: 3px;
`

const Label = styled.div`
  cursor: pointer;
  user-select: none;
`
