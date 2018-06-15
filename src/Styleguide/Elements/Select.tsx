import React from "react"
import styled, { css } from "styled-components"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Sans } from "@artsy/palette"

import { PositionProps, space, SpaceProps, themeGet } from "styled-system"

export interface SelectProps extends PositionProps, SpaceProps {}

export class Select extends React.Component<SelectProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <LargeSelect />
          else return <SmallSelect />
        }}
      </Responsive>
    )
  }
}

// Appears on both mobile and desktop
export const LargeSelect = () => {
  return (
    <LargeSelectContainer p={3}>
      <select>
        <option value="0">Recently updated</option>
        <option value="1">Recently added </option>
        <option value="2">Artwork year (desc.)</option>
        <option value="3">Artwork year (asc.)</option>
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

        <select>
          <option value="0">Recently updated</option>
          <option value="1">Recently added </option>
          <option value="2">Artwork year (desc.)</option>
          <option value="3">Artwork year (asc.)</option>
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
    right: 10px;

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
    top: 10px;

    ${caretArrow};
  }

  ${space};
`
