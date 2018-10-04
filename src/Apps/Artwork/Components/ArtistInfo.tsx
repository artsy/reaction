import { Box, Sans, Spacer, Spinner, StackableBorderBox } from "@artsy/palette"
import { ArtistInfo_artist } from "__generated__/ArtistInfo_artist.graphql"
import { ArtistInfoQuery } from "__generated__/ArtistInfoQuery.graphql"
import { ContextConsumer } from "Artsy"
import { Mediator } from "Artsy/SystemContext"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React, { SFC } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { data as sd } from "sharify"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { get } from "Utils/get"

import {
  ArtistBioFragmentContainer as ArtistBio,
  MarketInsightsFragmentContainer as MarketInsights,
  SelectedExhibitionFragmentContainer as SelectedExhibitions,
} from "Styleguide/Components"

interface ArtistInfoProps {
  artist: ArtistInfo_artist
  user: User
  mediator?: Mediator
}

export const ArtistInfo: SFC<ArtistInfoProps> = props => {
  const imageUrl = get(props, p => p.artist.image.url)

  return (
    <>
      <StackableBorderBox p={2} flexDirection="column">
        <EntityHeader
          name={props.artist.name}
          meta={props.artist.formatted_nationality_and_birthday}
          imageUrl={imageUrl}
          href={props.artist.href}
          FollowButton={
            <FollowArtistButton
              artist={props.artist}
              user={props.user}
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
              render={({ is_followed }) => {
                return (
                  <Sans
                    size="2"
                    weight="medium"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {is_followed ? "Following" : "Follow"}
                  </Sans>
                )
              }}
            >
              Follow
            </FollowArtistButton>
          }
        />
        <Spacer mb={1} />
        <ArtistBio bio={props.artist} />
      </StackableBorderBox>
      <StackableBorderBox p={2}>
        <MarketInsights artist={props.artist} border={false} />
      </StackableBorderBox>
      <StackableBorderBox p={2}>
        <SelectedExhibitions
          artistID={props.artist.id}
          border={false}
          totalExhibitions={props.artist.counts.partner_shows}
          exhibitions={props.artist.exhibition_highlights}
          ViewAllLink={
            <a href={`${sd.APP_URL}/artist/${props.artist.id}/cv`}>View all</a>
          }
        />
      </StackableBorderBox>
    </>
  )
}

export const ArtistInfoFragmentContainer = createFragmentContainer(
  ArtistInfo,
  graphql`
    fragment ArtistInfo_artist on Artist {
      id
      name
      href
      image {
        url(version: "square")
      }
      formatted_nationality_and_birthday
      counts {
        partner_shows
      }
      exhibition_highlights(size: 3) {
        ...SelectedExhibitions_exhibitions
      }
      ...ArtistBio_bio
      ...MarketInsightsArtistPage_artist
      ...FollowArtistButton_artist
    }
  `
)

export const ArtistInfoQueryRenderer = ({ artistID }: { artistID: string }) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<ArtistInfoQuery>
            environment={relayEnvironment}
            variables={{ artistID }}
            query={graphql`
              query ArtistInfoQuery($artistID: String!) {
                artist(id: $artistID) {
                  ...ArtistInfo_artist
                }
              }
            `}
            render={({ props }) => {
              if (props) {
                return (
                  <ArtistInfoFragmentContainer
                    artist={props.artist as any}
                    user={user}
                    mediator={mediator}
                  />
                )
              } else {
                return (
                  <Box width="100%" height="100px" position="relative">
                    <Spinner />
                  </Box>
                )
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
