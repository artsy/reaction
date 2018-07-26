import { Sans } from "@artsy/palette"
import React from "react"
import { Flex } from "Styleguide/Elements/Flex"

export const Placeholder = ({ name, ...props }) => (
  <Flex
    width="100%"
    style={{ background: "gray" }}
    justifyContent="center"
    alignItems="center"
    {...props}
  >
    <Sans size="5t" color="white" textAlign="center">
      {name}
    </Sans>
  </Flex>
)
