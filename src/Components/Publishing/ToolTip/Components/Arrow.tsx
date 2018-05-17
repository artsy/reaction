import styled from "styled-components"
import React from "react"

interface Props {
  up?: boolean
}

export const Arrow: React.SFC<Props> = props => {
  const { up } = props

  return (
    <ArrowContainer>
      <ArrowBody up={up} />
      <ArrowShadow up={up} />
    </ArrowContainer>
  )
}

Arrow.defaultProps = {
  up: false,
}

export const ArrowContainer = styled.div`
  position: relative;
`

const ArrowBody = styled.div.attrs<Props>({})`
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  z-index: 1;
  ${props =>
    props.up
      ? `border-bottom: 20px solid white;`
      : `border-top: 20px solid white;`};
`

const ArrowShadow = styled.div.attrs<Props>({})`
  position: absolute;
  left: 5px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.15));
  ${props =>
    props.up
      ? `
      border-bottom: 15px solid white;
      top: 0px;
    `
      : `
      border-top: 15px solid white;
      top: 5px;
    `};
`
