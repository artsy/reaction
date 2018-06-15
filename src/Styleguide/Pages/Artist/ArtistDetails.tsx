import React from "react"
import { media } from "Styleguide/Elements/Grid"
import { Serif } from "@artsy/palette"
import { Flex } from "Styleguide/Elements/Flex"
import { Button } from "Styleguide/Elements/Button"
import styled from "styled-components"

export const ArtistDetails = () => {
  return (
    <Flex width="100%" justifyContent="space-between">
      <Flex flexDirection="column">
        <Serif size="10">Donald Judd</Serif>
        <div>
          <Serif size="3">Brazilian, 1886-1973</Serif>
          <Serif size="3">4,321 followers</Serif>
        </div>
      </Flex>
      <Button variant="primaryBlack" size="medium">
        Follow
      </Button>
    </Flex>
  )
}
