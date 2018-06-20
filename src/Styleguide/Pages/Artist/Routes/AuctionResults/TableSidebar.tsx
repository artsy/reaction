import { Sans } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { LargeSelect } from "Styleguide/Elements/Select"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { selectProps } from "Styleguide/Pages/Fixtures/Select"
import { Responsive } from "Styleguide/Utils/Responsive"

export const TableSidebar = () => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallTableSidebar />
        else return <LargeTableSidebar />
      }}
    </Responsive>
  )
}

const LargeTableSidebar = () => {
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
            <LargeSelect {...selectProps} />
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
}

const SmallTableSidebar = () => {
  return (
    <Col>
      <Flex flexDirection="column" alignItems="center">
        <Box mb={2}>
          <Sans size="2" weight="medium">
            939 Results
          </Sans>
        </Box>

        <LargeSelect {...selectProps} />

        <Spacer mb={2} />
      </Flex>
    </Col>
  )
}
