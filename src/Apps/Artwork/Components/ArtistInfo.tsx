import { Sans, Spacer, StackableBorderBox } from "@artsy/palette"
import { ArtistInfo_artist } from "__generated__/ArtistInfo_artist.graphql"
import { ArtistInfoQuery } from "__generated__/ArtistInfoQuery.graphql"
import { ContextConsumer } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { Mediator } from "Artsy/SystemContext"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React, { Component } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { data as sd } from "sharify"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { get } from "Utils/get"

import {
  ArtistBioFragmentContainer as ArtistBio,
  MarketInsightsFragmentContainer as MarketInsights,
  SelectedExhibitionFragmentContainer as SelectedExhibitions,
} from "Styleguide/Components"
import Events from "Utils/Events"

interface ArtistInfoProps {
  artist: ArtistInfo_artist
  user: User
  mediator?: Mediator
}

const Container = ({ children }) => (
  <StackableBorderBox p={2}>{children}</StackableBorderBox>
)

@track(
  {
    context_module: Schema.ContextModule.Biography,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class ArtistInfo extends Component<ArtistInfoProps> {
  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheArtist,
    subject: Schema.Subject.ReadMore,
    type: Schema.Type.Button,
  })
  trackArtistBioReadMoreClick() {
    // noop
  }

  render() {
    const { biography_blurb, image, id, _id } = this.props.artist
    const showArtistBio = !!biography_blurb.text
    const imageUrl = get(this.props, p => image.cropped.url)

    return (
      <ContextConsumer>
        {({ user, mediator }) => (
          <>
            <StackableBorderBox p={2} flexDirection="column">
              <EntityHeader
                name={this.props.artist.name}
                meta={this.props.artist.formatted_nationality_and_birthday}
                imageUrl={imageUrl}
                href={this.props.artist.href}
                FollowButton={
                  <FollowArtistButton
                    artist={this.props.artist}
                    user={user}
                    trackingData={{
                      modelName: Schema.OwnerType.Artist,
                      context_module: [
                        Schema.ContextModule.Sidebar,
                        Schema.ContextModule.Biography,
                      ],
                      entity_id: _id,
                      entity_slug: id,
                    }}
                    onOpenAuthModal={() => {
                      mediator.trigger("open:auth", {
                        mode: "signup",
                        copy: `Sign up to follow ${this.props.artist.name}`,
                        signupIntent: "follow artist",
                        afterSignUpAction: {
                          kind: "artist",
                          action: "follow",
                          objectId: this.props.artist.id,
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
                  />
                }
              />
              {showArtistBio && (
                <>
                  <Spacer mb={1} />
                  <ArtistBio
                    bio={this.props.artist}
                    onReadMoreClicked={this.trackArtistBioReadMoreClick.bind(
                      this
                    )}
                  />
                </>
              )}
            </StackableBorderBox>
            <MarketInsights
              artist={this.props.artist}
              border={false}
              Container={Container}
            />
            <SelectedExhibitions
              artistID={this.props.artist.id}
              border={false}
              totalExhibitions={this.props.artist.counts.partner_shows}
              exhibitions={this.props.artist.exhibition_highlights}
              ViewAllLink={
                <a href={`${sd.APP_URL}/artist/${this.props.artist.id}/cv`}>
                  View all
                </a>
              }
              Container={Container}
            />
          </>
        )}
      </ContextConsumer>
    )
  }
}

export const ArtistInfoFragmentContainer = createFragmentContainer(
  ArtistInfo,
  graphql`
    fragment ArtistInfo_artist on Artist {
      _id
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
      {({ relayEnvironment }) => {
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
            render={renderWithLoadProgress(ArtistInfoFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
