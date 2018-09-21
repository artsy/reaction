import { Box, Flex, Image, Serif, Spacer } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import { ContextConsumer, track, Track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import FollowArtistButton from "Components/FollowButton/FollowArtistButton"
import React, { Component, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Carousel } from "Styleguide/Components"
import { Responsive } from "Utils/Responsive"

interface Props {
  artist: ArtistHeader_artist
  user?: User
  mediator?: {
    trigger: (action: string, config: object) => void
  }
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
      <ContextConsumer>
        {({ mediator, user }) => {
          return (
            <Responsive>
              {({ xs }) => {
                if (xs) {
                  return (
                    <SmallArtistHeader
                      mediator={mediator}
                      user={user}
                      {...props}
                    />
                  )
                } else {
                  return (
                    <LargeArtistHeader
                      mediator={mediator}
                      user={user}
                      {...props}
                    />
                  )
                }
              }}
            </Responsive>
          )
        }}
      </ContextConsumer>
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
          <Fragment>
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
            <Spacer my={2} />
          </Fragment>
        )}

        <span id="jumpto-ArtistHeader" />

        <Flex justifyContent="space-between">
          <Box>
            <Serif size="10">{props.artist.name}</Serif>
            <Flex>
              <Serif size="3">
                {props.artist.nationality && `${props.artist.nationality}, `}
                {props.artist.years}
              </Serif>
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
            buttonProps={
              {
                width: "100px",
                // FIXME: Hack to get around fixed with and centered text
                paddingLeft: 0,
                paddingRight: 0,
              } as any
            }
            user={user}
            onOpenAuthModal={() => {
              props.mediator.trigger("open:auth", {
                mode: "signup",
                copy: `Sign up to follow ${props.artist.name}`,
                signupIntent: "follow artist",
                afterSignUpAction: {
                  kind: "artist",
                  action: "follow",
                  objectId: props.artist.id,
                },
              })
            }}
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
          <Serif size="5">{props.artist.name}</Serif>
          <Flex>
            <Box mx={1}>
              <Serif size="2">
                {props.artist.nationality && `${props.artist.nationality}, `}
                {props.artist.years}
              </Serif>
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
            onOpenAuthModal={() => {
              props.mediator.trigger("open:auth", {
                mode: "signup",
                copy: `Sign up to follow ${props.artist.name}`,
                signupIntent: "follow artist",
                afterSignUpAction: {
                  kind: "artist",
                  action: "follow",
                  objectId: props.artist.id,
                },
              })
            }}
          >
            Follow
          </FollowArtistButton>
        </Box>
      </Flex>
    )
  }
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  graphql`
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
          resized(height: 300) {
            url
            width
            height
          }
        }
      }
      ...FollowArtistButton_artist
    }
  `
)
