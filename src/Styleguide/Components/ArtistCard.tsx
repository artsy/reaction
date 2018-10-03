import { ArtistCard_artist } from "__generated__/ArtistCard_artist.graphql"
import { Mediator } from "Artsy/SystemContext"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { Truncator } from "Components/Truncator"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"

import {
  Avatar,
  BorderBox,
  Button,
  Flex,
  Sans,
  Serif,
  space,
  Spacer,
} from "@artsy/palette"

interface Props {
  artist: ArtistCard_artist
  user: User
  mediator?: Mediator
}

const StyledLink = styled.a`
  text-decoration: none;
`

export class ArtistCard extends React.Component<Props> {
  render() {
    return (
      <StyledLink href={this.props.artist.href}>
        <Responsive>
          {({ xs }) => {
            if (xs) return <SmallArtistCard {...this.props} />
            else return <LargeArtistCard {...this.props} />
          }}
        </Responsive>
      </StyledLink>
    )
  }
}

export const LargeArtistCard: SFC<Props> = props => (
  <BorderBox hover flexDirection="column" width="100%" height="254px">
    <Flex flexDirection="column" flexGrow="0" alignItems="center" pt={1}>
      {props.artist.image && (
        <Avatar src={props.artist.image.cropped.url} mb={1} />
      )}

      <Serif size="3t" weight="semibold" textAlign="center">
        <Truncator maxLineCount={2}>{props.artist.name}</Truncator>
      </Serif>

      <Sans size="2">{props.artist.formatted_nationality_and_birthday}</Sans>
    </Flex>

    <Spacer mb={1} />

    <Flex flexDirection="column" alignItems="center">
      <FollowArtistButton
        artist={props.artist}
        user={props.user}
        onOpenAuthModal={maybeAuthenticated}
        render={_props => {
          return (
            <Button variant="secondaryOutline" size="small" width={space(9)}>
              Follow
            </Button>
          )
        }}
      >
        Follow
      </FollowArtistButton>
    </Flex>
  </BorderBox>
)

export const SmallArtistCard: SFC<Props> = props => (
  <BorderBox hover width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="center">
      <Serif size="3t" weight="semibold">
        <Truncator maxLineCount={2}>{props.artist.name}</Truncator>
      </Serif>

      <Sans size="1">{props.artist.formatted_nationality_and_birthday}</Sans>

      <Spacer mb={1} />

      <FollowArtistButton
        artist={props.artist}
        user={props.user}
        onOpenAuthModal={maybeAuthenticated}
        render={_props => {
          return (
            <Button variant="secondaryOutline" size="small" width="70px">
              Follow
            </Button>
          )
        }}
      >
        Follow
      </FollowArtistButton>
    </Flex>

    {props.artist.image && (
      <Avatar size="sm" src={props.artist.image.cropped.url} ml={2} />
    )}
  </BorderBox>
)

function maybeAuthenticated(props: Props) {
  return props.mediator.trigger("open:auth", {
    mode: "signup",
    copy: `Sign up to follow ${props.artist.name}`,
    signupIntent: "follow artist",
    afterSignUpAction: {
      kind: "artist",
      action: "follow",
      objectId: props.artist.id,
    },
  })
}

export const ArtistCardFragmentContainer = createFragmentContainer(
  ArtistCard,
  graphql`
    fragment ArtistCard_artist on Artist {
      name
      id
      href
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
