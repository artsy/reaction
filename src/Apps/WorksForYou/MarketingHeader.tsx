import React, { Component } from "react"
import { data as sd } from "sharify"
import styled from "styled-components"

import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"

import {
  BorderBox,
  Box,
  Button,
  Flex,
  Sans,
  Separator,
  Spacer,
} from "@artsy/palette"

const COLLECT_URL = `${sd.APP_URL}/collect?acquireable=true`

const VIDEO_URL = `${sd.FORCE_CLOUDFRONT_URL}/videos/9172018-bn-banner-xl.mp4`

@track({
  context_module: Schema.ContextModule.BNMOBanner,
})
export class MarketingHeader extends Component {
  @track({
    action_type: Schema.ActionType.Link,
    destination_path: COLLECT_URL,
  })
  handleClick() {
    window.location.href = COLLECT_URL
  }

  render() {
    return (
      <Container onClick={this.handleClick.bind(this)}>
        <BorderBox
          width="100%"
          height="220px"
          background={"black5"}
          p={0}
          style={{
            overflow: "hidden",
          }}
        >
          <Video src={VIDEO_URL} autoPlay loop />
        </BorderBox>

        <Spacer mb={1} />

        <Flex justifyContent="space-between" alignItems="center">
          <Box pr={2}>
            <Sans size="3" weight="medium">
              In-demand artworks, available to buy now
            </Sans>
            <Sans size="3" color={"black60"}>
              Collect works by today’s top artists, with transparent pricing,
              easy shipping, and a simple checkout process.
            </Sans>
          </Box>
          <Button onClick={this.handleClick}>Browse works</Button>
        </Flex>

        <Spacer mb={4} />

        <Separator />
      </Container>
    )
  }
}

const Container = styled.div`
  cursor: pointer;
`

const Video = styled.video`
  left: 0;
  object-fit: cover;
  object-position: 0% 50%;
  width: 100%;
  height: 220px;
`
