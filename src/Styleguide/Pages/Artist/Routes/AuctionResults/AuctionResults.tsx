import React from "react"
import { Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { AuctionResultItem } from "./AuctionResultItem"
import { TableColumns } from "./TableColumns"
import { TableSidebar } from "./TableSidebar"

export const AuctionResults = props => {
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

          {props.artist.auctionResults.edges.map(({ node }) => {
            return <AuctionResultItem {...node} />
          })}
        </Col>
      </Row>

      <Row>
        <Col>
          <Flex justifyContent="flex-end">
            <Pagination
              {...props.artist.auctionResults.pageCursors}
              onClick={props.loadAfter}
              onNext={props.loadNext}
              onPrev={props.loadPrev}
            />
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  )
}
