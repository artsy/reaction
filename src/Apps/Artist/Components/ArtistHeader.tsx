import { Box, Flex, Image, Serif, Spacer } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import { Mediator, SystemContextConsumer } from "Artsy"
import { track, Track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { Carousel } from "Components/v2/CarouselV3"
import React, { Component, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { AuthModalIntent, openAuthModal } from "Utils/openAuthModal"
import { Media } from "Utils/Responsive"

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

type Image = Props["artist"]["carousel"]["images"][0]

const carouselSlideTrack: Track<null, null, [Image]> = track

@track<Props>(
  props =>
    ({
      context_module: "Header",
      // TODO: Old schema for the Follow button
      modelName: "artist",
      entity_slug: props.artist.id,
      entity_id: props.artist._id,
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

    return (
      <Box width="100%">
        {hasImages && (
          <section>
            <Carousel
              height={200}
              data={carousel.images as object[]}
              render={(slide: Image) => {
                return (
                  <a href={slide.href} onClick={() => this.onClickSlide(slide)}>
                    <Image
                      px={5}
                      src={slide.resized.url}
                      width={slide.resized.width}
                      height={slide.resized.height}
                    />
                  </a>
                )
              }}
            />
          </section>
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
                  {props.artist.nationality && `${props.artist.nationality}, `}
                  {props.artist.years}
                </Serif>
              </H2>
              <Spacer mr={2} />
              {props.artist.counts.follows > 50 && (
                <Serif size="3">
                  {props.artist.counts.follows.toLocaleString()} followers
                </Serif>
              )}
            </Flex>
          </Box>
          <FollowArtistButton
            useDeprecatedButtonStyle={false}
            artist={props.artist}
            user={user}
            onOpenAuthModal={() => handleOpenAuth(props.mediator, props.artist)}
          >
            Follow
          </FollowArtistButton>
        </Flex>
      </Box>
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

    return (
      <Flex flexDirection="column">
        {hasImages && (
          <Fragment>
            <Carousel
              data={carousel.images as object[]}
              height={200}
              render={slide => {
                return (
                  <a href={slide.href} onClick={() => this.onClickSlide(slide)}>
                    <Image
                      px={5}
                      src={slide.resized.url}
                      width={slide.resized.width}
                      height={slide.resized.height}
                    />
                  </a>
                )
              }}
            />
            <Spacer my={2} />
          </Fragment>
        )}

        <span id="jumpto-ArtistHeader" />
        <Flex flexDirection="column" alignItems="center">
          <H1>
            <Serif size="5">{props.artist.name}</Serif>
          </H1>
          <Flex>
            <Box mx={1}>
              <H2>
                <Serif size="2">
                  {props.artist.nationality && `${props.artist.nationality}, `}
                  {props.artist.years}
                </Serif>
              </H2>
            </Box>
            {props.artist.counts.follows > 50 && (
              <Serif size="2">
                {props.artist.counts.follows.toLocaleString()} followers
              </Serif>
            )}
          </Flex>
        </Flex>
        <Box my={2}>
          <FollowArtistButton
            artist={props.artist}
            useDeprecatedButtonStyle={false}
            buttonProps={{ width: "100%" }}
            user={user}
            onOpenAuthModal={() => handleOpenAuth(props.mediator, props.artist)}
          >
            Follow
          </FollowArtistButton>
        </Box>
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

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  {
    artist: graphql`
      fragment ArtistHeader_artist on Artist {
        _id
        id
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
