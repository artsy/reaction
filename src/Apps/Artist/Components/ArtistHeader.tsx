import { Box, Flex, Image, Sans, Serif, Spacer } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Mediator, SystemContextConsumer } from "Artsy"
import { track, Track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { Carousel } from "Components/v2/Carousel"
import React, { Component, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "Utils/get"
import { AuthModalIntent, openAuthModal } from "Utils/openAuthModal"
import { Media } from "Utils/Responsive"
import { userIsAdmin } from "Utils/user"
import { ArtistIndicator } from "./ArtistIndicator"
import { highestCategory } from "./MarketInsights/MarketInsights"

/**
 * This H1 and H2 were added for SEO purposes
 * TODO: Remove when palette provides the ability to override typography element
 */
const H1 = styled.h1`
  all: initial;
  all: unset;
  margin: 0;
  padding: 0;
  font: normal;
  font-family: inherit;
  font-size: medium;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: normal;
`

const H2 = H1.withComponent("h2")

interface Props {
  artist: ArtistHeader_artist
  user?: User
  mediator?: Mediator
}

const CATEGORIES = {
  "blue-chip": "Blue Chip Representation",
  "top-established": "Established Representation",
  "top-emerging": "Emerging Representation",
}

type Image = Props["artist"]["carousel"]["images"][0]

const carouselSlideTrack: Track<null, null, [Image]> = track

@track<Props>(
  props =>
    ({
      context_module: "Header",
      // TODO: Old schema for the Follow button
      modelName: "artist",
      entity_slug: props.artist.slug,
      entity_id: props.artist.internalID,
    } as Schema.ContextModule & Schema.Old)
)
export class ArtistHeader extends Component<Props> {
  render() {
    const props = this.props
    return (
      <SystemContextConsumer>
        {({ mediator, user }) => {
          return (
            <>
              <Media at="xs">
                <SmallArtistHeader mediator={mediator} user={user} {...props} />
              </Media>
              <Media greaterThan="xs">
                <LargeArtistHeader mediator={mediator} user={user} {...props} />
              </Media>
            </>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

@track()
export class LargeArtistHeader extends Component<Props> {
  @carouselSlideTrack((_props, _state, [slide]) => {
    return {
      action_type: Schema.ActionType.Click,
      // TODO: Or keep using ‘thumbnail’ as per old Force schema
      subject: "carouselSlide",
      // TODO: Are you sure this is no longer needed? Like, do we not need to
      //       identify the specific slide?
      destination_path: slide.href,
    }
  })
  onClickSlide(slide) {
    // no-op
  }

  render() {
    const { props } = this
    const {
      artist: { carousel },
      user,
    } = props

    const hasImages = carousel && carousel.images
    const isAdmin = userIsAdmin(user)

    return (
      <HorizontalPadding>
        <Box width="100%">
          {hasImages && (
            <Carousel
              height="200px"
              options={{ pageDots: false }}
              data={carousel.images as object[]}
              render={(slide: Image, slideIndex: number) => {
                return (
                  <a href={slide.href} onClick={() => this.onClickSlide(slide)}>
                    <Image
                      px={0.3}
                      lazyLoad={slideIndex > 5}
                      src={slide.resized.url}
                      width={slide.resized.width}
                      height={slide.resized.height}
                      preventRightClick={!isAdmin}
                    />
                  </a>
                )
              }}
            />
          )}
          <Spacer my={2} />

          <span id="jumpto-ArtistHeader" />

          <Flex justifyContent="space-between">
            <Box>
              <H1>
                <Serif size="10">{props.artist.name}</Serif>
              </H1>
              <Flex>
                <H2>
                  <Serif size="3">
                    {props.artist.nationality &&
                      `${props.artist.nationality}, `}
                    {props.artist.years}
                  </Serif>
                </H2>
                <Spacer mr={2} />
              </Flex>
            </Box>
            <Flex justifyContent="space-between">
              {props.artist.counts.follows > 50 && (
                <Flex flexDirection="column" alignItems="center">
                  <Sans size="5t" weight="medium">
                    {props.artist.counts.follows.toLocaleString()}
                  </Sans>
                  <Sans size="2" color="black60" weight="medium">
                    Followers
                  </Sans>
                </Flex>
              )}
              <Spacer mr={3} />
              <FollowArtistButton
                useDeprecatedButtonStyle={false}
                artist={props.artist}
                user={user}
                onOpenAuthModal={() =>
                  handleOpenAuth(props.mediator, props.artist)
                }
              >
                Follow
              </FollowArtistButton>
            </Flex>
          </Flex>
        </Box>
        <Flex flexDirection="row">
          {renderRepresentationStatus(props.artist)}
          {renderAuctionHighlight(props.artist) &&
            renderRepresentationStatus(props.artist) && <Spacer mr={5} />}
          {renderAuctionHighlight(props.artist)}
        </Flex>
      </HorizontalPadding>
    )
  }
}

@track()
export class SmallArtistHeader extends Component<Props> {
  @carouselSlideTrack((_props, _state, [slide]) => {
    return {
      action_type: Schema.ActionType.Click,
      // TODO: Or keep using ‘thumbnail’ as per old Force schema
      subject: "carouselSlide",
      // TODO: Are you sure this is no longer needed? Like, do we not need to
      //       identify the specific slide?
      destination_path: slide.href,
    }
  })
  onClickSlide(slide) {
    // no-op
  }

  render() {
    const props = this.props
    const {
      artist: { carousel },
      user,
    } = props

    const hasImages = carousel && carousel.images
    const isAdmin = userIsAdmin(user)

    return (
      <Flex flexDirection="column">
        {hasImages && (
          <Fragment>
            <Carousel
              data={carousel.images as object[]}
              height="180px"
              options={{ pageDots: false }}
              render={slide => {
                return (
                  <a href={slide.href} onClick={() => this.onClickSlide(slide)}>
                    <Image
                      src={slide.resized.url}
                      px={0.3}
                      width={slide.resized.width}
                      height={slide.resized.height}
                      preventRightClick={!isAdmin}
                    />
                  </a>
                )
              }}
            />
            <Spacer my={2} />
          </Fragment>
        )}
        <span id="jumpto-ArtistHeader" />
        <Box mx={2}>
          <Flex flexDirection="column" alignItems="center">
            <H1>
              <Serif size="5">{props.artist.name}</Serif>
            </H1>
            <Flex>
              <Box mx={1}>
                <H2>
                  <Serif size="2">
                    {props.artist.nationality &&
                      `${props.artist.nationality}, `}
                    {props.artist.years}
                  </Serif>
                </H2>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Spacer mb={0.5} />
        <Flex flexDirection="row" justifyContent="center">
          {props.artist.counts.follows > 50 && (
            <Flex>
              <Sans size="2" weight="medium">
                {props.artist.counts.follows.toLocaleString()} followers
              </Sans>
              <Sans size="2" color="black100" mx={0.3} display="inline-block">
                •
              </Sans>
            </Flex>
          )}
          <Flex>
            <FollowArtistButton
              artist={props.artist}
              useDeprecatedButtonStyle={false}
              buttonProps={{ width: "100%" }}
              user={user}
              render={({ is_followed }) => {
                return (
                  <Sans
                    size="2"
                    weight="medium"
                    color="black"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {is_followed ? "Following" : "Follow"}
                  </Sans>
                )
              }}
              onOpenAuthModal={() =>
                handleOpenAuth(props.mediator, props.artist)
              }
            >
              Follow
            </FollowArtistButton>
          </Flex>
        </Flex>
        <Flex flexDirection="row" justifyContent="center">
          {renderRepresentationStatus(props.artist)}
          {renderAuctionHighlight(props.artist) &&
            renderRepresentationStatus(props.artist) && <Spacer mr={5} />}
          {renderAuctionHighlight(props.artist)}
        </Flex>
      </Flex>
    )
  }
}

const handleOpenAuth = (mediator, artist) => {
  openAuthModal(mediator, {
    entity: artist,
    contextModule: Schema.ContextModule.ArtistPage,
    intent: AuthModalIntent.FollowArtist,
  })
}

const renderAuctionHighlight = artist => {
  const topAuctionResult = get(
    artist,
    a => artist.auctionResultsConnection.edges[0].node.price_realized.display
  )
  if (topAuctionResult) {
    const auctionLabel = topAuctionResult + " Auction Record"
    return <ArtistIndicator label={auctionLabel} type="high-auction" />
  }
}

const renderRepresentationStatus = artist => {
  const { highlights } = artist
  const { partnersConnection } = highlights
  if (
    partnersConnection &&
    partnersConnection.edges &&
    partnersConnection.edges.length > 0
  ) {
    const highCategory = highestCategory(partnersConnection.edges)

    return (
      <ArtistIndicator label={CATEGORIES[highCategory]} type={highCategory} />
    )
  }
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  {
    artist: graphql`
      fragment ArtistHeader_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
        ) {
        highlights {
          partnersConnection(
            first: 10
            displayOnPartnerProfile: true
            representedBy: true
            partnerCategory: $partnerCategory
          ) {
            edges {
              node {
                categories {
                  slug
                }
              }
            }
          }
        }

        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          edges {
            node {
              price_realized: priceRealized {
                display(format: "0a")
              }
              organization
              sale_date: saleDate(format: "YYYY")
            }
          }
        }
        internalID
        slug
        name
        nationality
        years
        counts {
          follows
        }
        carousel {
          images {
            href
            resized(height: 200) {
              url
              width
              height
            }
          }
        }
        ...FollowArtistButton_artist
      }
    `,
  }
)
