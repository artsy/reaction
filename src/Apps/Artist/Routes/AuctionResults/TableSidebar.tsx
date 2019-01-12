import React from "react"
import { Subscribe } from "unstated"
import { Media } from "Utils/Responsive"
import { AuctionResultsState } from "./state"

import {
  Col,
  Flex,
  LargeSelect,
  Row,
  Sans,
  Separator,
  Spacer,
} from "@artsy/palette"

const SORTS = [
  {
    value: "DATE_DESC",
    text: "Most recent",
  },
  {
    value: "ESTIMATE_AND_DATE_DESC",
    text: "Estimate",
  },
  {
    value: "PRICE_AND_DATE_DESC",
    text: "Sale price",
  },
]

interface Props {
  count: number
}

export const TableSidebar = (props: Props) => {
  return (
    <Subscribe to={[AuctionResultsState]}>
      {(filters: AuctionResultsState) => {
        return (
          <Flex flexDirection="column">
            <Row>
              <Col>{renderCount(props.count)}</Col>
            </Row>

            <Media greaterThan="xs">
              <Row pt={0.5}>
                <Separator />
              </Row>
            </Media>

            <Spacer mt={[2, 3]} />

            <LargeSelect
              options={SORTS}
              selected={filters.state.sort}
              onSelect={filters.setSort}
            />

            <Spacer mb={2} />
          </Flex>
        )
      }}
    </Subscribe>
  )
}

const renderCount = (count: number) => {
  return (
    <Sans size="2" weight="medium">
      {`${count.toLocaleString()} Results`}
    </Sans>
  )
}
