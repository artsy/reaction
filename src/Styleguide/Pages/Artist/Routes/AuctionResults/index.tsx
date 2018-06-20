import React from "react"
import { Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { paginationProps } from "Styleguide/Pages/Fixtures/Pagination"
import { AuctionItem } from "./AuctionItem"
import { TableColumns } from "./TableColumns"
import { TableSidebar } from "./TableSidebar"

export const AuctionResults = () => {
  const { cursor, callbacks } = paginationProps

  return (
    <React.Fragment>
      <Row>
        <TableSidebar />

        <Col sm={10}>
          <Row>
            <TableColumns />
          </Row>

          <Box pt={0.5}>
            <Separator />
          </Box>

          <AuctionItem />
          <AuctionItem />
          <AuctionItem />
          <AuctionItem />
          <AuctionItem />
        </Col>
      </Row>

      <Row>
        <Col>
          <Flex justifyContent="flex-end">
            <Pagination {...cursor} {...callbacks} />
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  )
}
