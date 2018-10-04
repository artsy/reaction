import { Box, color, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import React, { Component } from "react"
import styled from "styled-components"
import { ReadMore } from "Styleguide/Components/ReadMore"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"

export class CollectionHeader extends Component {
  render() {
    return (
      <>
        <Flex flexDirection="column">
          <Box>
            <Background p={2} my={3}>
              <Sans size="3" color="white100">
                Collecting category
              </Sans>
              <Spacer mt={1} />
              <Serif size="10" color="white100">
                Minimalist Prints
              </Serif>
            </Background>
            <DescriptionContainer mb={5}>
              <Grid fluid>
                <Row>
                  <Col lg="8" md="5" sm="6">
                    <Serif size="5" px={2}>
                      <ReadMore
                        onReadMoreClicked={() => false}
                        maxChars={320}
                        content={TEXT}
                      />
                    </Serif>
                  </Col>
                </Row>
              </Grid>
            </DescriptionContainer>
          </Box>
        </Flex>
        <Spacer mb={2} />
      </>
    )
  }
}

const Background = styled(Box)`
  background: ${color("black30")};
  height: 240px;
`

const DescriptionContainer = styled(Flex)``

const TEXT = `
Obsessed with celebrity, consumer culture, and mechanical (re)production, Pop artist Andy Warhol created some of the most iconic images of the 20th century. As famous for his quips as for his art—he variously mused that “art is what you can get away with” and “everyone will be famous for 15 minutes”
`
