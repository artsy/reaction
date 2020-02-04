import React from "react"
import { Media } from "Utils/Responsive"

import { Flex, Row, Separator } from "@artsy/palette"
import { AuctionFilters } from "./Components/AuctionFilters"

export const TableSidebar = () => {
  return (
    <Flex flexDirection="column">
      <Media greaterThan="xs">
        <Row>
          <Separator />
        </Row>
      </Media>
      <AuctionFilters />
    </Flex>
  )
}
