import { Box, Col, Flex, Grid, Row } from "@artsy/palette"
import React from "react"
import { FilterSidebar } from "./FilterSidebar"
import { GridItem } from "./GridItem"
import { Header } from "./Header"

export const SearchResultsSkeleton: React.SFC<any> = props => {
  return (
    <Box>
      <Header />
      <Flex maxWidth={1192}>
        <FilterSidebar />
        <Grid fluid style={{ width: "75%", padding: "0 50px 0 50px" }}>
          <Row>
            <Col sm={4} pr={1}>
              <GridItem height={200} />
              <GridItem height={400} />
              <GridItem height={240} />
            </Col>
            <Col sm={4} pr={1}>
              <GridItem height={300} />
              <GridItem height={200} />
              <GridItem height={320} />
            </Col>
            <Col sm={4}>
              <GridItem height={240} />
              <GridItem height={400} />
            </Col>
          </Row>
        </Grid>
      </Flex>
    </Box>
  )
}
