// TODO: This and <Checkbox /> can be shared

import React from "react"
import styled from "styled-components"
import { Flex } from "./Flex"

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
    const { children } = this.props

    return (
      <Flex my={0.3} onClick={() => this.toggleSelected()}>
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
  ${styledSpace};
  background-color: ${({ selected }) =>
    selected ? color("black100") : color("white100")};
  border-color: ${({ selected }) =>
    selected ? color("black100") : color("black10")};
  width: ${space(2)}px;
  height: ${space(2)}px;
  border-radius: 50%;
  cursor: pointer;
`

const InnerCircle = styled.div`
  width: ${space(1)}px;
  height: ${space(1)}px;
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
