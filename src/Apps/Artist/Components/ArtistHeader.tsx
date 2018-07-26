import { Serif } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import { track, Track } from "Analytics"
import * as Schema from "Analytics/Schema"
import FollowArtistButton from "Components/FollowButton/FollowArtistButton"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppState } from "Router/state"
import { Slider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"

interface Props {
  artist: ArtistHeader_artist
  currentUser?: User
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
      <Subscribe to={[AppState]}>
        {({ state }) => {
          const {
            mediator,
            system: { currentUser },
          } = state

          return (
            <Responsive>
              {({ xs }) => {
                if (xs) {
                  return (
                    <SmallArtistHeader
                      mediator={mediator}
                      currentUser={currentUser}
                      {...props}
                    />
                  )
                } else {
                  return (
                    <LargeArtistHeader
                      mediator={mediator}
                      currentUser={currentUser}
                      {...props}
                    />
                  )
                }
              }}
            </Responsive>
          )
        }}
      </Subscribe>
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
    const props = this.props
    const {
      artist: { carousel },
      currentUser,
    } = props

    return (
      <Box width="100%">
        <Slider
          height={200}
          data={carousel.images as any}
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
            artist={props.artist as any}
            buttonProps={
              {
                width: "100px",
                // FIXME: Hack to get around fixed with and centered text
                paddingLeft: 0,
                paddingRight: 0,
              } as any
            }
            currentUser={currentUser}
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
      currentUser,
    } = props

    return (
      <Flex flexDirection="column">
        <Slider
          data={carousel.images as any}
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
            artist={props.artist as any}
            useDeprecatedButtonStyle={false}
            buttonProps={{ width: "100%" }}
            currentUser={currentUser}
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
