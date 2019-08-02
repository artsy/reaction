import { Box, color, Flex } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { getViewportWidth } from "Utils/viewport"
import { ReactComponent as Logo } from "../../Assets/ArtsyVanguard/NewlyEstablished-01"

const { height, width } = getViewportWidth()

storiesOf("Components/InvertedCSS", module)
  .add("Inverted CSS Over HTML", () => (
    <Box height={height} width={width}>
      <Background />
      <Middleground />
      <Foreground />
      <InvertedText>Statement.</InvertedText>
    </Box>
  ))
  .add("Inverted CSS Over SVG", () => (
    <div style={{ padding: 10 }}>
      <Title>Inverted CSS Over SVG</Title>
      <section>
        <SVGRect />
        <Flex flexDirection="column">
          <Vanguard>Vanguard</Vanguard>
        </Flex>
      </section>
    </div>
  ))
  .add("Inverted CSS Over Video", () => (
    <div style={{ padding: 10 }}>
      <section>
        <Title>Inverted CSS Over Video</Title>
      </section>
    </div>
  ))

const SVGContainer = styled.svg`
  height: 1000px;
  width: 1000px;
  padding: 10px;
  flex-shrink: 0;
  isolation: isolate;
`

const SVGRect = props => (
  <SVGContainer {...props}>
    <rect
      id="backgroundrect"
      width="1000px"
      height="1000px"
      x="0"
      y="0"
      fill="#000000"
      stroke="none"
    />
    )
  </SVGContainer>
)

const Vanguard = styled(Flex)`
  flex-direction: column;
  transform: rotate(0.75turn);
  position: absolute;
  left: 0;
  bottom: 350;
    mix-blend-mode: multiply;    
    padding-left: 20px;
    text-align: center;
    font-size: 50px;
}
`
const Title = styled.h1`
  ${unica("s40")};
`

// Background and Middleground height needs to take up the height of the viewport
// so that the mix blend mode color inversion has a backdrop to contrast against.
// Use inherit on height it's height is always as large as the parent.
const Background = styled(Box)`
  background: ${color("white100")};
  width: 100%;
  height: inherit;
  z-index: 1;
  position: absolute;
`

const Middleground = styled(Box)`
  background: ${color("black100")};
  width: 435px;
  height: inherit;
  z-index: 2;
  position: absolute;
`

const Foreground = styled(Box)`
  mix-blend-mode: screen;
  background-color: ${color("black100")};
  width: 800px;
  height: 200px;
  z-index: 4;
  position: absolute;
`

const InvertedText = styled(Box)`
  position: fixed;
  font-family: Arial, Helvetica;
  font-size: 100px;
  mix-blend-mode: difference;
  color: white;
  z-index: 3;
  transform: rotate(270deg);
  margin: 250px 0 0 195px;
`
