import { Sans, Serif } from "@artsy/palette"
import FollowArtistButton from "Components/FollowButton/FollowArtistButton"
import React from "react"
import { Avatar } from "Styleguide/Elements"
import { BorderBox } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

import { ArtistCard_artist } from "__generated__/ArtistCard_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  artist: ArtistCard_artist
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class ArtistCard extends React.Component<Props> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallArtistCard {...this.props} />
          else return <LargeArtistCard {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeArtistCard = (props: Props) => (
  <BorderBox hover flexDirection="column" width="100%">
    <Flex flexDirection="column" flexGrow="0" alignItems="center" pt={1}>
      {props.artist.image && (
        <Avatar src={props.artist.image.cropped.url} mb={1} />
      )}
      <Serif size="3t" weight="semibold">
        {props.artist.name}
      </Serif>
      <Sans size="2">{props.artist.formatted_nationality_and_birthday}</Sans>
    </Flex>

    <Spacer mb={1} />

    <Flex flexDirection="column" alignItems="center">
      <FollowArtistButton
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
        artist={props.artist as any}
      >
        Follow
      </FollowArtistButton>
    </Flex>
  </BorderBox>
)

export const SmallArtistCard = (props: Props) => (
  <BorderBox hover width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="center">
      <Serif size="3t">{props.artist.name}</Serif>
      <Sans size="1">{props.artist.formatted_nationality_and_birthday}</Sans>
      <FollowArtistButton
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
        artist={props.artist as any}
      >
        Follow
      </FollowArtistButton>
    </Flex>
    {props.artist.image && (
      <Avatar size="small" src={props.artist.image.cropped.url} ml={2} />
    )}
  </BorderBox>
)

export const ArtistCardFragmentContainer = createFragmentContainer(
  ArtistCard,
  graphql`
    fragment ArtistCard_artist on Artist {
      name
      id
      image {
        cropped(width: 400, height: 300) {
          url
        }
      }
      formatted_nationality_and_birthday
      ...FollowArtistButton_artist
    }
  `
)
