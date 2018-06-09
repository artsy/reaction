import React, { Component } from "react"
import Icon from "Components/Icon"
import styled, { css } from "styled-components"
import { themeGet } from "styled-system"
import { Sans } from "@artsy/palette"

export class Pagination extends Component {
  state = {
    hasNextPage: false,
    hasPreviousPage: false,
  }

  render() {
    return (
      <div>
        <Page num={1} />
        <PageSpan mx={2} />

        <Page num={4} active />
        <Page num={5} />
        <Page num={6} />

        <PageSpan mx={1} />
        <Page num={7} />

        <PrevButton />
        <NextButton />
      </div>
    )
  }
}

const Page = ({ num, ...props }) => {
  return (
    <Button {...props}>
      <Sans display="inline" size={3}>
        {num}
      </Sans>
    </Button>
  )
}

const PageSpan = ({ mx }) => {
  return (
    <Sans display="inline" size={3} mx={mx} color="black30">
      ...
    </Sans>
  )
}

const PrevButton = props => {
  return (
    <Sans display="inline" size={3} mx={2}>
      <a href="#" className="noUnderline">
        <Arrow direction="left" /> Prev
      </a>
    </Sans>
  )
}

const NextButton = props => {
  return (
    <Sans display="inline" size={3} mx={2}>
      <a href="#" className="noUnderline">
        Next <Arrow direction="right" />
      </a>
    </Sans>
  )
}

const Arrow = ({ direction }) => {
  return (
    <Icon
      name={`chevron-${direction}` as any}
      color="black"
      fontSize="9px"
      top={-1}
    />
  )
}

const activeButton = css`
  background: ${themeGet("colors.black5")};
  border-radius: 2px;
  border: 0;
`

const Button = styled.button.attrs<{ active?: boolean }>({})`
  cursor: pointer;
  width: 23px;
  height: 25px;
  background: transparent;
  border: 0;

  outline: 0;

  ${p => p.active && activeButton};

  &:hover {
    ${activeButton};
  }
`
