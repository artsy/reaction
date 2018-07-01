import { Serif } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import FollowArtistButton from "Components/FollowButton/FollowArtistButton"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GlobalState } from "Router/state"
import { Slider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"

import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"

interface Props {
  artist: ArtistHeader_artist
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export const ArtistHeader: React.SFC<Props> = props => {
  return (
    <Subscribe to={[GlobalState]}>
      {({ state }) => {
        return (
          <Responsive>
            {({ xs }) => {
              if (xs) {
                return (
                  <SmallArtistHeader
                    mediator={state.force && state.force.mediator}
                    {...props}
                  />
                )
              } else {
                return (
                  <LargeArtistHeader
                    mediator={state.force && state.force.mediator}
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

export const LargeArtistHeader = (props: Props) => {
  const { carousel } = props.artist

  return (
    <Box width="100%">
      <Slider
        height={200}
        data={carousel.images as any}
        render={slide => {
          return (
            <Image
              px={5}
              src={slide.resized.url}
              width={slide.resized.width}
              height={slide.resized.height}
            />
          )
        }}
      />
      <Spacer my={2} />

      <Flex justifyContent="space-between">
        <Box>
          <Serif size="10">{props.artist.name}</Serif>
          <Flex>
            <Serif size="3">
              {props.artist.nationality && `${props.artist.nationality}, `}
              {props.artist.years}
            </Serif>
            <Spacer mr={2} />
            <Serif size="3">
              {props.artist.counts.follows.toLocaleString()} followers
            </Serif>
          </Flex>
        </Box>
        <FollowArtistButton
          artist={props.artist as any}
          onOpenAuthModal={() => {
            props.mediator &&
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

export const SmallArtistHeader = (props: Props) => {
  const { carousel } = props.artist
  return (
    <Flex flexDirection="column">
      <Slider
        data={carousel.images as any}
        render={slide => {
          return (
            <Image
              px={5}
              src={slide.resized.url}
              width={slide.resized.width}
              height={slide.resized.height}
            />
          )
        }}
      />
      <Spacer my={2} />

      <Flex flexDirection="column" alignItems="center">
        <Serif size="5">{props.artist.name}</Serif>
        <Flex>
          <Box mx={1}>
            <Serif size="2">
              {props.artist.nationality && `${props.artist.nationality}, `}
              {props.artist.years}
            </Serif>
          </Box>
          <Serif size="2">
            {props.artist.counts.follows.toLocaleString()} followers
          </Serif>
        </Flex>
      </Flex>
      <Box my={2}>
        <FollowArtistButton
          artist={props.artist as any}
          onOpenAuthModal={() => {
            props.mediator &&
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

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  graphql`
    fragment ArtistHeader_artist on Artist {
      name
      id
      nationality
      years
      counts {
        follows
      }
      carousel {
        images {
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
