import React, { SFC } from "react"
import styled from "styled-components"
import Icon from "../../Icon"

interface Props {
  direction: "left" | "right"
  onClick?: () => void
}

export const Arrow: SFC<Props> = ({ direction, onClick }) => {
  return (
    <SliderArrow direction={direction} onClick={onClick}>
      <Icon
        name={`chevron-${direction}` as any}
        color="black"
        fontSize="24px"
      />
    </SliderArrow>
  )
}

const SliderArrow = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  height: 50vh;
  top: 0;
  box-sizing: border-box;
  ${(props: Props) => (props.direction === "left" ? "left: -120px;" : "")};
  ${(props: Props) => (props.direction === "right" ? "right: -120px;" : "")};
  ${Icon} {
    z-index: 1;
    cursor: pointer;
    padding: 60px;
  }
`
