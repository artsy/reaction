import { Box, color, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import React, { Component } from "react"
import styled from "styled-components"
import { ReadMore } from "Styleguide/Components/ReadMore"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"

interface Props {
  id: string
  title: string
  image: string
  description?: string
  image_caption?: string
  medium?: string
  major_periods?: string[]
  gene_ids?: string[]
  artist_ids?: string[]
}

const getReadMoreContent = (description, image_caption) => {
  return (
    <Box>
      {description}
      <Spacer mt={3} />
      <ImageCaption>{image_caption}</ImageCaption>
    </Box>
  )
}

export class CollectionHeader extends Component<Props> {
  render() {
    return (
      <>
        <Flex flexDirection="column">
          <Box>
            <Background p={2} my={3} headerImageUrl={this.props.image}>
              <SubtitlesContainer>
                <Sans size="3" color="white100">
                  Collecting category
                </Sans>
                <Sans size="3" color="white100" ml="auto">
                  <a href="/collect">View all artworks</a>
                </Sans>
              </SubtitlesContainer>
              <Spacer mt={1} />
              <Title size="10" color="white100">
                {this.props.title}
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
                        content={getReadMoreContent(
                          this.props.description,
                          this.props.image_caption
                        )}
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

const Background = styled(Box)<{ headerImageUrl: string }>`
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

const ImageCaption = styled(Box)`
  ${unica("s12")};
`
