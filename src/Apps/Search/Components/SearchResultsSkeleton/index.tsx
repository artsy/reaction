import { Box, Col, Flex, Grid, Row } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import React from "react"
import { FilterSidebar } from "./FilterSidebar"
import { GridItem } from "./GridItem"
import { Header } from "./Header"

export const SearchResultsSkeleton: React.FC<any> = props => {
  return (
    <AppContainer>
      <HorizontalPadding>
        <Box>
          <Header />
          <Flex>
            <FilterSidebar />
            <Grid fluid style={{ width: "75%" }}>
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
      </HorizontalPadding>
    </AppContainer>
  )
}
