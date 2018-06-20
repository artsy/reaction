import { Sans } from "@artsy/palette"
import React from "react"
import styled, { css } from "styled-components"
import { Responsive } from "Styleguide/Utils/Responsive"

import { PositionProps, space, SpaceProps, themeGet } from "styled-system"

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
      <select onChange={event => props.onSelect(event.target.value)}>
        {props.options.map(({ value, text }) => (
          <option selected={value === props.selected} value={value}>
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

        <select onChange={event => props.onSelect(event.target.value)}>
          {props.options.map(({ value, text }) => (
            <option selected={value === props.selected} value={value}>
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
    font-family: ${themeGet("fontFamily.garamond.regular")};
    font-size: ${themeGet("typeSizes.serif4.fontSize")}px;
    line-height: ${themeGet("typeSizes.serif4.lineHeight")}px;

    ${hideDefaultSkin};

    border: 1px solid ${themeGet("colors.black10")};
    border-radius: 0;

    ${space};
  }

  &:after {
    content: "";
    position: absolute;
    top: 45%;
    right: ${props => props.theme.space["1"]}px;

    ${caretArrow};
  }
`

const SmallSelectContainer = styled.div.attrs<SelectProps>({})`
  position: relative;

  select {
    font-size: ${themeGet("typeSizes.sans2.fontSize")}px;
    line-height: ${themeGet("typeSizes.sans2.lineHeight")}px;
    font-weight: bold;

    ${hideDefaultSkin};
  }

  &:after {
    content: "";
    position: absolute;
    top: ${props => props.theme.space["1"]}px;

    ${caretArrow};
  }

  ${space};
`
