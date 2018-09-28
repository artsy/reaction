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
  themeProps,
} from "@artsy/palette"

const VIDEO_URL = `${sd.FORCE_CLOUDFRONT_URL}/videos/9172018-bn-banner-xl.mp4`
const COLLECT_URL =
  "https://artsy.net/collect?split_test[new_collect_page]=new&acquireable=true"

@track({
  context_module: Schema.Context.BNMOBanner,
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
      <Container onClick={this.handleClick}>
        <BorderBox
          width="100%"
          height="220px"
          background={themeProps.colors.black5}
          p={0}
          style={{
            overflow: "hidden",
          }}
        >
          <Video src={VIDEO_URL} autoPlay loop />
        </BorderBox>

        <Spacer mb={1} />

        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="3">Introducing a new way to buy on Artsy</Sans>
            <Sans size="3" color={themeProps.colors.black60}>
              Buying art on Artsy is easier than ever before. Our most in-demand
              works are now available for instant purchase, with simple checkout
              and hassle-free shipping.
            </Sans>
          </Box>
          <Button onClick={this.handleClick}>Browse works</Button>
        </Flex>

        <Spacer mb={5} />

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
