import styled from "styled-components"
import React from "react"

export const ArrowDown: React.SFC = () => {
  return (
    <ArrowContainer>
      <Arrow />
      <ArrowShadow />
    </ArrowContainer>
  )
}

export const ArrowContainer = styled.div`
  position: relative;
`

const Arrow = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid white;
  z-index: 1;
`

const ArrowShadow = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid white;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.15));
`
