import { extend } from "lodash"
import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { FollowArtistButton_artist } from "../../__generated__/FollowArtistButton_artist.graphql"
import { track } from "../../Utils/track"
import * as Artsy from "../Artsy"
import { FollowButton } from "./Button"
import { FollowTrackingData } from "./Typings"

interface Props
  extends React.HTMLProps<FollowArtistButton>,
    Artsy.ContextProps {
  relay?: RelayProp
  artist?: FollowArtistButton_artist
  tracking?: any
  trackingData?: FollowTrackingData
  onOpenAuthModal?: (type: "register" | "login", config?: Object) => void
}

export class FollowArtistButton extends React.Component<Props> {
  trackFollow = () => {
    const {
      tracking,
      artist: { is_followed },
    } = this.props
    const trackingData: FollowTrackingData = this.props.trackingData || {}
    const action = is_followed ? "Unfollowed Artist" : "Followed Artist"

    tracking.trackEvent(extend({ action }, trackingData))
  }

  handleFollow = () => {
    const { artist, currentUser, relay, onOpenAuthModal } = this.props

    if (currentUser && currentUser.id) {
      commitMutation(relay.environment, {
        mutation: graphql`
          mutation FollowArtistButtonMutation($input: FollowArtistInput!) {
            followArtist(input: $input) {
              artist {
                is_followed
              }
            }
          }
        `,
        variables: {
          input: {
            artist_id: artist.id,
            unfollow: artist.is_followed,
          },
        },
        optimisticResponse: {
          followArtist: {
            artist: {
              __id: artist.__id,
              is_followed: !artist.is_followed,
            },
          },
        },
      })
      this.trackFollow()
    } else {
      onOpenAuthModal &&
        onOpenAuthModal("register", {
          context_module: "intext tooltip",
          intent: "follow artist",
          copy: "Sign up to follow artists",
        })
    }
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

export default track()(
  createFragmentContainer(
    Artsy.ContextConsumer(FollowArtistButton),
    graphql`
      fragment FollowArtistButton_artist on Artist {
        __id
        id
        is_followed
      }
    `
  )
)
