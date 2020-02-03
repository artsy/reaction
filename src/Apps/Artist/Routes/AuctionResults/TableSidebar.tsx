import React from "react"
import { Media } from "Utils/Responsive"

import { Flex, Row, Separator, Spacer } from "@artsy/palette"
import { SortSelect } from "./Components/SortSelect"

interface Props {
  count: number
}

export const TableSidebar = (props: Props) => {
  return (
    <Flex flexDirection="column">
      <Media greaterThan="xs">
        <Row pt={0.5}>
          <Separator />
        </Row>
      </Media>

      <Spacer mt={[2, 3]} />

      <SortSelect />

      <Spacer mb={2} />
    </Flex>
  )
}
