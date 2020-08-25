import {
  FollowedArtistArgs,
  Intent,
  followedArtist,
  unfollowedArtist,
} from "@artsy/cohesion"
import { FollowArtistButtonMutation } from "__generated__/FollowArtistButtonMutation.graphql"
import * as Artsy from "Artsy"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import { FollowArtistButton_artist } from "../../__generated__/FollowArtistButton_artist.graphql"
import { FollowButtonDeprecated } from "./ButtonDeprecated"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"

interface Props
  extends React.HTMLProps<FollowArtistButton>,
    Artsy.SystemContextProps {
  relay?: RelayProp
  artist?: FollowArtistButton_artist
  tracking?: TrackingProp
  trackingData: FollowedArtistArgs
  onOpenAuthModal: (type: ModalType, config?: ModalOptions) => void
}

@track()
export class FollowArtistButton extends React.Component<Props> {
  trackFollow = () => {
    const {
      artist: { is_followed },
      tracking,
      trackingData,
    } = this.props
    const analyticsData = is_followed
      ? unfollowedArtist(trackingData)
      : followedArtist(trackingData)

    tracking.trackEvent(analyticsData)
  }

  handleFollow = () => {
    const { user, trackingData, onOpenAuthModal } = this.props

    if (user && user.id) {
      this.followArtistForUser()
    } else {
      onOpenAuthModal(ModalType.signup, {
        contextModule: trackingData.contextModule,
        intent: Intent.followArtist,
        copy: "Sign up to follow artists",
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: trackingData.ownerId,
        },
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
      <FollowButtonDeprecated
        isFollowed={artist && artist.is_followed}
        handleFollow={this.handleFollow}
      />
    )
  }
}

export const FollowArtistButtonFragmentContainer = createFragmentContainer(
  Artsy.withSystemContext(FollowArtistButton),
  {
    artist: graphql`
      fragment FollowArtistButton_artist on Artist {
        id
        internalID
        name
        is_followed: isFollowed
        counts {
          follows
        }
      }
    `,
  }
)
