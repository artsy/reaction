import { unica } from "Assets/Fonts"
import { ReadMore } from "Components/v2/ReadMore"
import React, { Component } from "react"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { resize } from "Utils/resizer"
import { Responsive } from "Utils/Responsive"

import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"

import {
  Box,
  Col,
  color,
  Flex,
  Grid,
  media,
  Row,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"

interface Props {
  collection: {
    artist_ids?: string[]
    category: string
    credit?: string
    description?: JSX.Element | string
    gene_ids?: string[]
    headerImage: string
    major_periods?: string[]
    medium?: string
    slug: string
    title: string
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
  xs: 350,
  sm: 730,
  md: 670,
  lg: 660,
  xl: 820,
}

const imageWidthSizes = {
  xs: 320,
  sm: 688,
  md: 820,
  lg: 944,
  xl: 1112,
}

@track({
  context_module: Schema.ContextModule.CollectionDescription,
})
export class CollectionHeader extends Component<Props> {
  @track({
    subject: Schema.Subject.ReadMore,
    type: Schema.Type.Button,
    action_type: Schema.ActionType.Click,
  })
  trackReadMoreClick() {
    // noop
  }

  render() {
    const { collection } = this.props
    return (
      <Responsive>
        {({ xs, sm, md, lg }) => {
          const size = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : "xl"
          const imageWidth = imageWidthSizes[size]
          const imageHeight = xs ? 160 : 240
          const chars = maxChars[size]
          const categoryTarget = `/collections#${slugify(collection.category)}`

          return (
            <header>
              <Flex flexDirection="column">
                <Box>
                  <Background
                    p={2}
                    mt={[0, 3]}
                    mb={3}
                    headerImageUrl={resize(collection.headerImage, {
                      width: imageWidth * (xs ? 2 : 1),
                      height: imageHeight * (xs ? 2 : 1),
                      quality: 80,
                    })}
                    height={imageHeight}
                  >
                    <Overlay />
                    <MetaContainer>
                      <SubtitlesContainer>
                        <Sans size={["2", "3"]} color="white100">
                          <a href={categoryTarget}>{collection.category}</a>
                        </Sans>
                        <Sans size={["2", "3"]} color="white100" ml="auto">
                          <a href="/collect">View all artworks</a>
                        </Sans>
                      </SubtitlesContainer>
                      <Spacer mt={1} />
                      <Title size={["6", "10"]} color="white100">
                        <h1>{collection.title}</h1>
                      </Title>
                    </MetaContainer>
                  </Background>
                  <DescriptionContainer mb={5}>
                    <Grid>
                      <Row>
                        <Col xl="8" lg="8" md="10" sm="12" xs="12">
                          <ExtendedSerif size="3" px={[0, 1]}>
                            <ReadMore
                              onReadMoreClicked={this.trackReadMoreClick.bind(
                                this
                              )}
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
            </header>
          )
        }}
      </Responsive>
    )
  }
}

const Background = styled(Box)<{
  headerImageUrl: string
  height: number
}>`
  position: relative;
  background: ${color("black30")};
  height: ${props => props.height}px;
  background-image: url(${props => props.headerImageUrl});
  background-size: cover;
  background-position: center;

  ${media.xs`
    margin-left: -20px;
    margin-right: -20px;
  `};
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
    text-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`

const Title = styled(Serif)`
  text-transform: capitalize;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`

const ImageCaption = styled(Box)`
  ${unica("s12")};
`

const ExtendedSerif = styled(Serif)`
  div span {
    span p {
      display: inline;
    }

    div p {
      display: inline;
      ${unica("s12")};
    }
  }
`
