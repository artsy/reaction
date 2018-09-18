import React, { SFC } from "react"
import { data as sd } from "sharify"
import styled from "styled-components"

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

export const MarketingHeader: SFC = () => {
  return (
    <>
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
        <Button
          onClick={() =>
            // FIXME: Redirect to collect once page route has been renamed.
            (window.location.href = "http://www.artsy.net/collect2")
          }
        >
          Browse works
        </Button>
      </Flex>

      <Spacer mb={5} />

      <Separator />
    </>
  )
}

const Video = styled.video`
  left: 0;
  object-fit: cover;
  object-position: 0% 50%;
  width: 100%;
  height: 220px;
`
