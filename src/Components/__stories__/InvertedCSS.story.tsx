import { Box, Flex } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"

storiesOf("Components/InvertedCSS", module)
  .add("Inverted CSS Over SVG", () => (
    <div style={{ padding: 10 }}>
      <Title>Inverted CSS Over SVG</Title>
      <section>
        <SVGRect>
          <Flex flexDirection="column">
            <Vanguard />
          </Flex>
        </SVGRect>
      </section>
    </div>
  ))
  .add("Inverted CSS Over HTML Div", () => (
    <div style={{ padding: 10 }}>
      <section>
        <Title>Inverted CSS Over Video </Title>
      </section>
    </div>
  ))
  .add("Inverted CSS Over Video", () => (
    <div style={{ padding: 10 }}>
      <section>
        <Title>Inverted CSS Over HTML</Title>
        <Background />
      </section>
    </div>
  ))

const SVGContainer = styled.svg`
  height: 1000px;
  width: 1000px;
  padding: 10px;
  flex-shrink: 0;
`

const SVGRect = props => (
  <SVGContainer {...props}>
    <title>my vector image</title>
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
  max-height: 100%;
  &:after {
    me
    padding-left: 20px;
    content: "Vanguard";
    text-align: center;
    mix-blend-mode: difference;
    color:white;
    font-size: 50px;
  }

}
`
const Title = styled.h1`
  ${unica("s40")};
`

const Background = styled(Box)`
  background-color: black;
  width: 1000px;
  height: 500px;
  overflow: visible;
  color: red;
  mix-blend-mode: difference;
`
