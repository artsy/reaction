import { Sans, Spacer, StackableBorderBox } from "@artsy/palette"
import { ArtistInfo_artist } from "__generated__/ArtistInfo_artist.graphql"
import { ArtistInfoQuery } from "__generated__/ArtistInfoQuery.graphql"
import { ContextConsumer } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { Mediator } from "Artsy/SystemContext"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React, { SFC } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { TrackingProp } from "react-tracking"
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
  tracking?: TrackingProp
}

const Container = ({ children }) => (
  <StackableBorderBox p={2}>{children}</StackableBorderBox>
)

export const ArtistInfo: SFC<ArtistInfoProps> = props => {
  const showArtistBio = !!props.artist.biography_blurb.text
  const imageUrl = get(props, p => p.artist.image.cropped.url)

  console.log(props)
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
            >
              Follow
            </FollowArtistButton>
          }
        />
        {showArtistBio && (
          <>
            <Spacer mb={1} />
            <ArtistBio
              bio={props.artist}
              onReadMoreClicked={() => {
                props.tracking.trackEvent({
                  flow: Schema.Flow.ArtworkAboutTheArtist,
                  type: Schema.Type.Button,
                  label: Schema.Label.ReadMore,
                })
              }}
            />
          </>
        )}
      </StackableBorderBox>
      <MarketInsights
        artist={props.artist}
        border={false}
        Container={Container}
      />
      <SelectedExhibitions
        artistID={props.artist.id}
        border={false}
        totalExhibitions={props.artist.counts.partner_shows}
        exhibitions={props.artist.exhibition_highlights}
        ViewAllLink={
          <a href={`${sd.APP_URL}/artist/${props.artist.id}/cv`}>View all</a>
        }
        Container={Container}
      />
    </>
  )
}

export const ArtistInfoFragmentContainer = createFragmentContainer(
  track({
    context_module: Schema.ContextModule.Biography,
  })(ArtistInfo),
  graphql`
    fragment ArtistInfo_artist on Artist {
      id
      name
      href
      image {
        cropped(width: 100, height: 100) {
          url
        }
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

      # The below data is only used to determine whether a section
      # should be rendered

      biography_blurb(format: HTML, partner_bio: true) {
        text
      }
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
            render={renderWithLoadProgress(ArtistInfoFragmentContainer as any)}
          />
        )
      }}
    </ContextConsumer>
  )
}
