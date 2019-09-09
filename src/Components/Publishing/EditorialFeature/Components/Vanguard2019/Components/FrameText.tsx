import { color, Flex, Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

export const VanguardFrameText: React.SFC = () => {
  return (
    <>
      <Media at="xs">
        <MobileFrame>
          <MobileFrameText size="8">The Artsy</MobileFrameText>
          <MobileFrameText size="8" isUppercase>
            Vanguard
          </MobileFrameText>
          <MobileFrameText size="8" isUppercase>
            2019
          </MobileFrameText>
        </MobileFrame>
      </Media>

      {/* Desktop */}
      <Media greaterThan="xs">
        <FrameTextLeft size={["12", "12", "14", "16"]}>Vanguard</FrameTextLeft>
        <FrameTextRight size={["12", "12", "14", "16"]}>2019</FrameTextRight>
      </Media>
    </>
  )
}

const FrameText = styled(Sans)`
  position: fixed;
  top: 50%;
  text-transform: uppercase;
  z-index: 2;
  mix-blend-mode: difference;
  color: ${color("white100")};
  will-change: color;
`

const FrameTextLeft = styled(FrameText)`
  left: 0;
  transform: rotate(-90deg);
  transform-origin: 30% 136%;
`

const FrameTextRight = styled(FrameText)`
  right: 0;
  transform: rotate(90deg);
  transform-origin: 60% 60%;
`

const MobileFrame = styled(Flex)`
  position: fixed;
  flex-direction: column;
  top: 65px;
  left: 0;
  height: calc(100vh - 150px);
  width: 60px;
  justify-content: space-between;
  z-index: 2;
`

const MobileFrameText = styled(Sans)<{ isUppercase?: boolean }>`
  transform: rotate(90deg);
  white-space: nowrap;
  padding: 0 10px;

  ${({ isUppercase }) =>
    isUppercase &&
    `
    text-transform: uppercase;
  `}
`
