import React from "react"
import { media } from "Styleguide/Elements/Grid"
import { Serif } from "@artsy/palette"
import { Flex } from "Styleguide/Elements/Flex"
import { Button } from "Styleguide/Elements/Button"
import styled from "styled-components"

export const ArtistMetadata = () => {
  return (
    <React.Fragment>
      <Serif size="10">Donald Judd</Serif>
      <Flex>
        <Serif size="3">Brazilian, 1886-1973</Serif>
        <Serif size="3">4,321 followers</Serif>
        <FollowButton variant="primaryBlack">Follow</FollowButton>
      </Flex>
    </React.Fragment>
  )
}

const FollowButton = styled(Button)`
  float: right;

  ${media.xs`
    float: left;
  `};
`
