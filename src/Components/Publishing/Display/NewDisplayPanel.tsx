import { Box, color, Flex } from "@artsy/palette"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React, { SFC } from "react"
import { Bling as GPT } from "react-gpt"
import styled from "styled-components"

export interface DisplayPanelProps extends React.HTMLProps<HTMLDivElement> {
  adUnit?: AdUnit
  adDimension?: AdDimension
}

export const NewDisplayPanel: SFC<DisplayPanelProps> = props => {
  const { adDimension, adUnit } = props
  const [width, height] = adDimension.split("x").map((a: string) => parseInt(a))

  return (
    <Wrapper color="black100">
      <DisplayPanelContainer
        flexDirection="column"
        className="DisplayPanel__DisplayPanelContainer"
        p="40px auto"
        m="auto"
        width={width}
        height={height}
      >
        <GPT
          adUnitPath={`/21805539690/${adUnit}`}
          targeting={{
            is_testing: "no",
            page_type: "article",
            post_id: "5cdd7407cb1f5f00189c8205",
          }}
          slotSize={[width, height]}
        />
      </DisplayPanelContainer>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  cursor: pointer;
  text-decoration: none;
  max-width: 360px;
`
const DisplayPanelContainer = styled(Flex)`
  max-width: 360px;
  box-sizing: border-box;
  background: ${color("black5")};
  text-align: center;
`

// Set names for tests and DOM
DisplayPanelContainer.displayName = "DisplayPanelContainer"
Wrapper.displayName = "Wrapper"
