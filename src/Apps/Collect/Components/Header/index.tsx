import { Box, color, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import React, { Component } from "react"
import styled from "styled-components"
import { ReadMore } from "Styleguide/Components/ReadMore"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"

interface Props {
  collection: {
    id: string
    title: string
    image: string
    description?: string
    medium?: string
    major_periods?: string[]
    gene_ids?: string[]
    artist_ids?: string[]
  }
}

export class CollectionHeader extends Component<Props> {
  render() {
    return (
      <>
        <Flex flexDirection="column">
          <Box>
            <Background
              p={2}
              my={3}
              headerImageUrl={this.props.collection.image}
            >
              <SubtitlesContainer>
                <Sans size="3" color="white100">
                  Collecting category
                </Sans>
                <Sans size="3" color="white100" ml="auto">
                  <a href="#">View all collections</a>
                </Sans>
              </SubtitlesContainer>
              <Spacer mt={1} />
              <Title size="10" color="white100">
                {this.props.collection.title}
              </Title>
            </Background>
            <DescriptionContainer mb={5}>
              <Grid fluid>
                <Row>
                  <Col lg="8" md="5" sm="6">
                    <Serif size="5" px={2}>
                      <ReadMore
                        onReadMoreClicked={() => false}
                        maxChars={320}
                        content={this.props.collection.description}
                      />
                    </Serif>
                  </Col>
                </Row>
              </Grid>
            </DescriptionContainer>
            <Spacer mb={1} />
          </Box>
        </Flex>
        <Spacer mb={2} />
      </>
    )
  }
}

const Background = styled(Box).attrs<{ headerImageUrl: string }>({})`
  background: ${color("black30")};
  height: 240px;
  background-image: url(${props => props.headerImageUrl});
`

const DescriptionContainer = styled(Flex)``

const SubtitlesContainer = styled(Box)`
  display: flex;
`

const Title = styled(Serif)`
  text-transform: capitalize;
`
