import { ArtistCard_artist } from "__generated__/ArtistCard_artist.graphql"
import { Mediator } from "Artsy/SystemContext"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { Truncator } from "Components/Truncator"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"

import {
  Avatar,
  BorderBox,
  Box,
  Button,
  Flex,
  Link,
  Sans,
  Serif,
  space,
  Spacer,
} from "@artsy/palette"

interface Props {
  artist: ArtistCard_artist
  user: User
  mediator?: Mediator
  /** Lazy load the avatar image */
  lazyLoad?: boolean
  onClick?: () => void
}

export class ArtistCard extends React.Component<Props> {
  static defaultProps = {
    lazyLoad: false,
  }

  render() {
    return (
      <Link
        onClick={this.props.onClick}
        href={this.props.artist.href}
        noUnderline
      >
        <Media at="xs">
          <SmallArtistCard {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <LargeArtistCard {...this.props} />
        </Media>
      </Link>
    )
  }
}

export const LargeArtistCard: SFC<Props> = props => (
  <BorderBox hover flexDirection="column" width="100%" height="254px">
    <Flex flexDirection="column" flexGrow="0" alignItems="center" pt={1} mb={1}>
      {props.artist.image && (
        <Box mb={1}>
          <Avatar
            lazyLoad={props.lazyLoad}
            src={get(props.artist.image, i => i.cropped.url)}
          />
        </Box>
      )}

      <Serif size="3t" weight="semibold" textAlign="center">
        <Truncator maxLineCount={2}>{props.artist.name}</Truncator>
      </Serif>

      <Sans size="2">{props.artist.formatted_nationality_and_birthday}</Sans>
    </Flex>

    <Flex flexDirection="column" alignItems="center" mt={3}>
      <FollowArtistButton
        artist={props.artist}
        user={props.user}
        onOpenAuthModal={() => maybeAuthenticated(props)}
        render={({ is_followed }) => {
          return (
            <Button variant="secondaryOutline" size="small" width={space(9)}>
              {getButtonLabel(is_followed)}
            </Button>
          )
        }}
      />
    </Flex>
  </BorderBox>
)

export const SmallArtistCard: SFC<Props> = props => (
  <BorderBox hover width="100%">
    {props.artist.image && (
      <Box mr={2}>
        <Avatar
          lazyLoad={props.lazyLoad}
          size="xs"
          src={get(props.artist.image, i => i.cropped.url)}
        />
      </Box>
    )}
    <Flex flexDirection="column">
      <Serif size="3t" weight="semibold">
        <Truncator maxLineCount={2}>{props.artist.name}</Truncator>
      </Serif>

      <Sans size="1">{props.artist.formatted_nationality_and_birthday}</Sans>

      <Spacer mb={1} />

      <FollowArtistButton
        artist={props.artist}
        user={props.user}
        onOpenAuthModal={() => maybeAuthenticated(props)}
        render={({ is_followed }) => {
          return (
            <Button variant="secondaryOutline" size="small" width="70px">
              {getButtonLabel(is_followed)}
            </Button>
          )
        }}
      />
    </Flex>
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

// Helpers

const getButtonLabel = (isFollowed: boolean): string => {
  return isFollowed ? "Unfollow" : "Follow"
}
