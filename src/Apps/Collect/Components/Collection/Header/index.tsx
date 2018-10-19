import { Box, color, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import React, { Component } from "react"
import styled from "styled-components"
import { ReadMore } from "Styleguide/Components/ReadMore"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { resize } from "Utils/resizer"
import { Responsive } from "Utils/Responsive"

interface Props {
  collection: {
    slug: string
    title: string
    headerImage: string
    description?: JSX.Element | string
    credit?: string
    medium?: string
    major_periods?: string[]
    gene_ids?: string[]
    artist_ids?: string[]
  }
}

const getReadMoreContent = (description, credit) => {
  return (
    <>
      {description && (
        <span dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Spacer mt={3} />
      {credit && <ImageCaption dangerouslySetInnerHTML={{ __html: credit }} />}
    </>
  )
}

const maxChars = {
  xs: 200,
  sm: 420,
  md: 460,
  lg: 460,
  xl: 510,
}

const imageWidthSizes = {
  xs: 320,
  sm: 688,
  md: 820,
  lg: 944,
  xl: 1112,
}

export class CollectionHeader extends Component<Props> {
  render() {
    const { collection } = this.props
    return (
      <Responsive>
        {({ xs, sm, md, lg }) => {
          const size = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : "xl"
          const imageWidth = imageWidthSizes[size]
          const chars = maxChars[size]
          const subtitleFontSize = xs ? "1" : "3"

          return (
            <>
              <Flex flexDirection="column">
                <Box>
                  <Background
                    p={2}
                    my={3}
                    headerImageUrl={resize(collection.headerImage, {
                      width: imageWidth,
                    })}
                  >
                    <Overlay />
                    <MetaContainer>
                      <SubtitlesContainer>
                        <Sans size={subtitleFontSize} color="white100">
                          Collecting category
                        </Sans>
                        <Sans
                          size={subtitleFontSize}
                          color="white100"
                          ml="auto"
                        >
                          <a href="/collect">View all artworks</a>
                        </Sans>
                      </SubtitlesContainer>
                      <Spacer mt={1} />
                      <Title size={xs ? "5" : "10"} color="white100">
                        {collection.title}
                      </Title>
                    </MetaContainer>
                  </Background>
                  <DescriptionContainer mb={5}>
                    <Grid>
                      <Row>
                        <Col xl="8" lg="8" md="9" sm="12" xs="12">
                          <ExtendedSerif size="5" px={1}>
                            <ReadMore
                              onReadMoreClicked={() => false}
                              maxChars={chars}
                              content={getReadMoreContent(
                                collection.description,
                                collection.credit
                              )}
                            />
                          </ExtendedSerif>
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
        }}
      </Responsive>
    )
  }
}

const Background = styled(Box)<{ headerImageUrl: string }>`
  position: relative;
  background: ${color("black30")};
  height: 240px;
  background-image: url(${props => props.headerImageUrl});
`
export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.15)
  );
  z-index: 0;
`

const MetaContainer = styled(Box)`
  position: relative;
  z-index: 1;
`

const DescriptionContainer = styled(Flex)``

const SubtitlesContainer = styled(Box)`
  display: flex;

  ${Sans} {
    text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  }
`

const Title = styled(Serif)`
  text-transform: capitalize;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`

const ImageCaption = styled(Box)`
  ${unica("s12")};
`

const ExtendedSerif = styled(Serif)`
  div span span p {
    display: inline;
  }
`
