import { color, Flex } from "@artsy/palette"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React, { SFC } from "react"
import { Bling as GPT } from "react-gpt"
import styled from "styled-components"

interface DisplayCanvasProps {
  adUnit?: AdUnit
  adDimension?: AdDimension
  displayNewAds?: boolean
}

export const NewDisplayCanvas: SFC<DisplayCanvasProps> = props => {
  const { adUnit, adDimension, displayNewAds } = props

  if (!displayNewAds) {
    return null
  }

  const [width, height] = adDimension.split("x").map((a: string) => parseInt(a))

  return (
    <DisplayCanvasContainer flexDirection="column" m="auto" p={2}>
      <GPT adUnitPath={`/21805539690/${adUnit}`} slotSize={[width, height]} />
    </DisplayCanvasContainer>
  )
}

const DisplayCanvasContainer = styled(Flex)`
  min-height: fit-content;
  box-sizing: border-box;
  background: ${color("black5")};
  text-align: center;
`

// Set names for tests and DOM
DisplayCanvasContainer.displayName = "DisplayCanvasContainer"
