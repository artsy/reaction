import { Box, Col, Flex, Grid, Row } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import React from "react"
import { Media } from "Utils/Responsive"
import { FilterSidebar } from "./FilterSidebar"
import { GridItem } from "./GridItem"
import { Header } from "./Header"

export const SearchResultsSkeleton: React.FC<any> = props => {
  return (
    <AppContainer>
      <Box>
        <Header />
        <Flex>
          <Media greaterThan="xs">
            <FilterSidebar />
          </Media>
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
    </AppContainer>
  )
}
