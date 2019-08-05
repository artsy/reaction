import { Box, color, Flex } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { unica } from "Assets/Fonts"
import { NewlyEstablished1 } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Assets/NewlyEstablished"
import React from "react"
import styled from "styled-components"
import { getViewportWidth } from "Utils/viewport"

const { height, width } = getViewportWidth()

storiesOf("Publishing/InvertedCSS", module)
  .add("Inverted CSS Over HTML", () => (
    <Box height={height} width={width}>
      <Background />
      <Middleground />
      <Foreground />
      <InvertedText>Statement.</InvertedText>
    </Box>
  ))
  .add("Inverted CSS Over SVG", () => (
    <SVGWrapper height={height * 2} width={width} p={1}>
      <Box mb={4.5}>
        <Title>Inverted CSS Over SVG</Title>
      </Box>
      <InvertedText>Vanguard</InvertedText>
      <SVG />
      <SVGForeground />
    </SVGWrapper>
  ))
  .add("Inverted CSS Over Video", () => (
    <div style={{ padding: 10 }}>
      <section>
        <Title>Inverted CSS Over Video</Title>
      </section>
    </div>
  ))

/**
 * Background and Middleground heights need to take up the height of the viewport
 * so that the mix-blend-mode color inversion has a backdrop to contrast against.
 * Use inherit on height it's height is always as large as the parent.
 */
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

const SVGForeground = styled(Flex)`
  flex-grow: 1;
  height: 1001px;
  mix-blend-mode: difference;
  background: white;
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

const SVGWrapper = styled(Box)`
  overflow: hidden;
`
const Title = styled.h1`
  ${unica("s40")};
`
/**
 * Adding huge padding bottom here as a temporary hack to push the transparent border
 * below the rest of the page content
 */
const SVG = styled(NewlyEstablished1)`
  padding-bottom: 7000px;
  background-color: ${color("white100")};
  mix-blend-mode: difference;
`
