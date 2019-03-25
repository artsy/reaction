import {
  Button,
  EntityHeader,
  Flex,
  Sans,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
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
import { get } from "Utils/get"

import {
  ArtistBioFragmentContainer as ArtistBio,
  MarketInsightsFragmentContainer as MarketInsights,
  SelectedExhibitionFragmentContainer as SelectedExhibitions,
} from "Components/v2"
import Events from "Utils/Events"

interface ArtistInfoProps {
  artist: ArtistInfo_artist
  user: User
  mediator?: Mediator
}

interface ArtistInfoState {
  showArtistInsights: boolean
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
export class ArtistInfo extends Component<ArtistInfoProps, ArtistInfoState> {
  state = {
    showArtistInsights: false,
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheArtist,
    subject: Schema.Subject.ReadMore,
    type: Schema.Type.Button,
  })
  trackArtistBioReadMoreClick() {
    // noop
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheArtist,
    subject: Schema.Subject.ShowArtistInsights,
    type: Schema.Type.Button,
  })
  toggleArtistInsights() {
    this.setState({
      showArtistInsights: !this.state.showArtistInsights,
    })
  }

  render() {
    const { artist } = this.props
    const { biography_blurb, image, id, _id } = this.props.artist
    const showArtistBio = !!biography_blurb.text
    const imageUrl = get(this.props, p => image.cropped.url)
    const showArtistInsightsButton =
      (artist.exhibition_highlights &&
        artist.exhibition_highlights.length > 0) ||
      (artist.auctionResults && artist.auctionResults.edges.length > 0) ||
      (artist.collections && artist.collections.length > 0) ||
      (artist.highlights.partners &&
        artist.highlights.partners.edges.length > 0)
    const buttonText = this.state.showArtistInsights
      ? "Hide artist insights"
      : "Show artist insights"

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
                      context_module: Schema.ContextModule.Biography,
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
              {showArtistInsightsButton && (
                <Flex flexDirection="column" alignItems="flex-start">
                  <Button
                    onClick={this.toggleArtistInsights.bind(this)}
                    variant="secondaryGray"
                    size="small"
                    mt={1}
                  >
                    {buttonText}
                  </Button>
                </Flex>
              )}
            </StackableBorderBox>
            {this.state.showArtistInsights && (
              <>
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
          </>
        )}
      </ContextConsumer>
    )
  }
}

// ADDED COLLECTIONS, HIGHLIGHTS, AND AUCTION RESULTS TO FRAGMENT FOR SHOW ARTIST INSIGHTS BUTTON VISIBLILITY CHECK

export const ArtistInfoFragmentContainer = createFragmentContainer(
  ArtistInfo,
  graphql`
    fragment ArtistInfo_artist on Artist
      @argumentDefinitions(
        partner_category: {
          type: "[String]"
          defaultValue: ["blue-chip", "top-established", "top-emerging"]
        }
      ) {
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
      collections
      highlights {
        partners(
          first: 10
          display_on_partner_profile: true
          represented_by: true
          partner_category: $partner_category
        ) {
          edges {
            node {
              categories {
                id
              }
            }
          }
        }
      }
      auctionResults(
        recordsTrusted: true
        first: 1
        sort: PRICE_AND_DATE_DESC
      ) {
        edges {
          node {
            price_realized {
              display(format: "0a")
            }
          }
        }
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
