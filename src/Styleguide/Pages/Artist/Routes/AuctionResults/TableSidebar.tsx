import { Sans } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { LargeSelect } from "Styleguide/Elements/Select"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Subscribe } from "unstated"
import { FilterState } from "./state"

const SORTS = [
  {
    value: "DATE_DESC",
    text: "Most Recent",
  },
  {
    value: "ESTIMATE_AND_DATE_DESC",
    text: "Estimate",
  },
  {
    value: "PRICE_AND_DATE_DESC",
    text: "Sale Price",
  },
]

export const TableSidebar = () => {
  return (
    <Subscribe to={[FilterState]}>
      {filters => {
        return (
          <Responsive>
            {({ xs }) => {
              if (xs) return <SmallTableSidebar filters={filters} />
              else return <LargeTableSidebar filters={filters} />
            }}
          </Responsive>
        )
      }}
    </Subscribe>
  )
}

const LargeTableSidebar = props => {
  return (
    <React.Fragment>
      <Col sm={2} pr={2}>
        <Row>
          <Col>
            <Sans size="2" weight="medium">
              939 Results
            </Sans>
          </Col>
        </Row>

        <Box pt={0.5}>
          <Separator />
        </Box>

        <Row>
          <Col>
            <LargeSelect
              options={SORTS}
              selected={props.filters.state.sort}
              onSelect={(props.filters as any).setSort}
            />
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
}

const SmallTableSidebar = props => {
  return (
    <Col>
      <Flex flexDirection="column" alignItems="center">
        <Box mb={2}>
          <Sans size="2" weight="medium">
            939 Results
          </Sans>
        </Box>

        <LargeSelect
          options={SORTS}
          selected={props.filters.state.sort}
          onSelect={(props.filters as any).setSort}
        />

        <Spacer mb={2} />
      </Flex>
    </Col>
  )
}
