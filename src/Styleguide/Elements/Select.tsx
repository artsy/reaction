import { color, Sans, space } from "@artsy/palette"
import React from "react"
import styled, { css } from "styled-components"
import { Responsive } from "Utils/Responsive"

import {
  PositionProps,
  space as styledSpace,
  SpaceProps,
  themeGet,
} from "styled-system"

interface Option {
  value: string
  text: string
}
export interface SelectProps extends PositionProps, SpaceProps {
  options: Option[]
  selected?: string
  onSelect?: (value) => void
}

export class Select extends React.Component<SelectProps> {
  static defaultProps = {
    onSelect: _value => ({}),
  }
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <LargeSelect {...this.props} />
          else return <SmallSelect {...this.props} />
        }}
      </Responsive>
    )
  }
}

// Appears on both mobile and desktop
export const LargeSelect = (props: SelectProps) => {
  return (
    <LargeSelectContainer {...props} p={1}>
      <select
        value={props.selected}
        onChange={event => props.onSelect(event.target.value)}
      >
        {props.options.map(({ value, text }) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </select>
    </LargeSelectContainer>
  )
}

export const SmallSelect = props => {
  return (
    <SmallSelectContainer {...props}>
      <label>
        <Sans size="2" display="inline" mr={0.5}>
          Sort:
        </Sans>

        <select
          value={props.selected}
          onChange={event => props.onSelect(event.target.value)}
        >
          {props.options.map(({ value, text }) => (
            <option value={value} key={value}>
              {text}
            </option>
          ))}
        </select>
      </label>
    </SmallSelectContainer>
  )
}

const hideDefaultSkin = css`
  background: none;
  border: none;
  cursor: pointer;
  outline: 0;
  -webkit-appearance: none;
`

const caretArrow = css`
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid black;
  width: 0;
  height: 0;
`

const LargeSelectContainer = styled.div.attrs<SelectProps>({})`
  position: relative;
  width: 100%;

  select {
    width: 100%;
    font-family: ${themeGet("fontFamily.serif.regular")};
    font-size: ${themeGet("typeSizes.serif.3.fontSize")}px;
    line-height: ${themeGet("typeSizes.serif.3t.lineHeight")}px;
    height: 40px;
    ${hideDefaultSkin};
    border: 1px solid ${color("black10")};
    border-radius: 0;
    ${styledSpace};
  }

  &::after {
    content: "";
    cursor: pointer;
    pointer-events: none;
    position: absolute;
    top: 45%;
    right: ${space(1)}px;

    ${caretArrow};
  }
`

const SmallSelectContainer = styled.div.attrs<SelectProps>({})`
  position: relative;

  select {
    font-size: ${themeGet("typeSizes.sans.2.fontSize")}px;
    line-height: ${themeGet("typeSizes.sans.2.lineHeight")}px;
    font-weight: bold;
    ${hideDefaultSkin};
  }

  &::after {
    content: "";
    cursor: pointer;
    pointer-events: none;
    position: absolute;
    top: ${space(1)}px;
    margin-left: -8px;
    ${caretArrow};
  }

  ${styledSpace};
`
