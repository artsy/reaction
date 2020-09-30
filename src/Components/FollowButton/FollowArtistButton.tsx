import { Intent, followedArtist, unfollowedArtist } from "@artsy/cohesion"
import { FollowArtistButtonMutation } from "__generated__/FollowArtistButtonMutation.graphql"
import * as Artsy from "Artsy"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import { FollowArtistButton_artist } from "../../__generated__/FollowArtistButton_artist.graphql"
import { FollowButton } from "./FollowButton"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { AuthContextModule } from "@artsy/cohesion"
import {
  AnalyticsContextProps,
  withAnalyticsContext,
} from "Artsy/Analytics/AnalyticsContext"
import { openAuthToFollow } from "Utils/openAuthModal"

interface Props
  extends React.HTMLProps<FollowArtistButton>,
    Artsy.SystemContextProps,
    AnalyticsContextProps {
  relay?: RelayProp
  artist?: FollowArtistButton_artist
  tracking?: TrackingProp
  contextModule: AuthContextModule
}

@track()
export class FollowArtistButton extends React.Component<Props> {
  trackFollow = () => {
    const {
      artist: { internalID, is_followed, slug },
      tracking,
      contextModule,
      contextPageOwnerId,
      contextPageOwnerSlug,
      contextPageOwnerType,
    } = this.props

    const trackingData = {
      contextModule,
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      contextOwnerType: contextPageOwnerType,
      ownerId: internalID,
      ownerSlug: slug,
    }

    const analyticsData = is_followed
      ? unfollowedArtist(trackingData)
      : followedArtist(trackingData)

    tracking.trackEvent(analyticsData)
  }

  handleFollow = () => {
    const { artist, user, contextModule, mediator } = this.props

    if (user && user.id) {
      this.followArtistForUser()
    } else {
      openAuthToFollow(mediator, {
        entity: artist,
        contextModule,
        intent: Intent.followArtist,
      })
    }
  }

  followArtistForUser = () => {
    const { artist, relay } = this.props

    const newFollowCount = artist.is_followed
      ? artist.counts.follows - 1
      : artist.counts.follows + 1

    commitMutation<FollowArtistButtonMutation>(relay.environment, {
      mutation: graphql`
        mutation FollowArtistButtonMutation($input: FollowArtistInput!) {
          followArtist(input: $input) {
            artist {
              id
              is_followed: isFollowed
              counts {
                follows
              }
            }
          }
        }
      `,
      variables: {
        input: {
          artistID: artist.internalID,
          unfollow: artist.is_followed,
        },
      },
      optimisticResponse: {
        followArtist: {
          artist: {
            id: artist.id,
            is_followed: !artist.is_followed,
            counts: { follows: newFollowCount },
          },
        },
      },
      updater: (store, data) => {
        const artistProxy = store.get(data.followArtist.artist.id)

        artistProxy
          .getLinkedRecord("counts")
          .setValue(newFollowCount, "follows")
      },
    })
    this.trackFollow()
  }

  render() {
    const { artist } = this.props

    return (
      <FollowButton
        isFollowed={artist && artist.is_followed}
        handleFollow={this.handleFollow}
      />
    )
  }
}

export const FollowArtistButtonFragmentContainer = createFragmentContainer(
  Artsy.withSystemContext(withAnalyticsContext(FollowArtistButton)),
  {
    artist: graphql`
      fragment FollowArtistButton_artist on Artist {
        id
        internalID
        name
        slug
        is_followed: isFollowed
        counts {
          follows
        }
      }
    `,
  }
)
