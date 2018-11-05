import { Box, Flex, LargeSelect, Sans, Separator, Spacer } from "@artsy/palette"
import React from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Subscribe } from "unstated"
import { Media } from "Utils/Responsive"
import { AuctionResultsState } from "./state"

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
    <>
      <Media at="xs">
        <SmallTableSidebar {...props} />
      </Media>
      <Media greaterThanOrEqual="sm">
        <LargeTableSidebar {...props} />
      </Media>
    </>
  )
}

const LargeTableSidebar = (props: Props) => {
  return (
    <Subscribe to={[AuctionResultsState]}>
      {(filters: AuctionResultsState) => {
        return (
          <>
            <Col sm={2} pr={2}>
              <Row>
                <Col>{renderCount(props.count)}</Col>
              </Row>

              <Box pt={0.5}>
                <Separator />
              </Box>

              <Spacer mt={3} />

              <Row>
                <Col>
                  <LargeSelect
                    options={SORTS}
                    selected={filters.state.sort}
                    onSelect={filters.setSort}
                  />
                </Col>
              </Row>
            </Col>
          </>
        )
      }}
    </Subscribe>
  )
}

const SmallTableSidebar = (props: Props) => {
  return (
    <Subscribe to={[AuctionResultsState]}>
      {(filters: AuctionResultsState) => {
        return (
          <Col>
            <Flex flexDirection="column" alignItems="center">
              <Box mb={2}>{renderCount(props.count)}</Box>

              <LargeSelect
                options={SORTS}
                selected={filters.state.sort}
                onSelect={filters.setSort}
              />

              <Spacer mb={2} />
            </Flex>
          </Col>
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
