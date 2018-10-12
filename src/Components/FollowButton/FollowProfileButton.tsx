import { FollowProfileButtonMutation } from "__generated__/FollowProfileButtonMutation.graphql"
import * as Artsy from "Artsy/SystemContext"
import { extend } from "lodash"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import { FollowProfileButton_profile } from "../../__generated__/FollowProfileButton_profile.graphql"
import { FollowButton } from "./Button"
import { FollowTrackingData } from "./Typings"

import { ButtonProps } from "@artsy/palette"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

interface Props
  extends React.HTMLProps<FollowProfileButton>,
    Artsy.ContextProps {
  relay?: RelayProp
  profile?: FollowProfileButton_profile
  tracking?: TrackingProp
  trackingData?: FollowTrackingData
  onOpenAuthModal?: (type: "register" | "login", config?: object) => void

  buttonProps?: Partial<ButtonProps>
  /**
   * Custom renderer for alternative button displays
   */
  render?: (profile: FollowProfileButton_profile) => JSX.Element
}

export class FollowProfileButton extends React.Component<Props> {
  static defaultProps = {
    buttonProps: {},
  }

  trackFollow = () => {
    const {
      tracking,
      profile: { is_followed },
    } = this.props
    const trackingData: FollowTrackingData = this.props.trackingData || {}
    const action = is_followed ? "Unfollowed Profile" : "Followed Profile"

    tracking.trackEvent(extend({ action }, trackingData))
  }

  handleFollow = e => {
    e.preventDefault() // If this button is part of a link, we _probably_ dont want to actually follow the link.
    const { profile, user, relay, onOpenAuthModal } = this.props

    if (user && user.id) {
      commitMutation<FollowProfileButtonMutation>(relay.environment, {
        mutation: graphql`
          mutation FollowProfileButtonMutation($input: FollowProfileInput!) {
            followProfile(input: $input) {
              profile {
                __id
                is_followed
              }
            }
          }
        `,
        variables: {
          input: {
            profile_id: profile.id,
            unfollow: profile.is_followed,
          },
        },
        optimisticResponse: {
          followProfile: {
            profile: {
              __id: profile.__id,
              is_followed: !profile.is_followed,
            },
          },
        },
      })
      this.trackFollow()
    } else {
      onOpenAuthModal &&
        onOpenAuthModal("register", {
          contextModule: "intext tooltip",
          intent: "follow profile",
          copy: "Sign up to follow profile",
        })
    }
  }

  render() {
    const { profile, buttonProps, render } = this.props

    // Custom button renderer
    if (render) {
      return <span onClick={this.handleFollow}>{render(profile)}</span>
    } else {
      return (
        <FollowButton
          isFollowed={profile && profile.is_followed}
          handleFollow={this.handleFollow}
          buttonProps={buttonProps}
        />
      )
    }
  }
}

export const FollowProfileButtonFragmentContainer = track({})(
  createFragmentContainer(
    Artsy.withContext(FollowProfileButton),
    graphql`
      fragment FollowProfileButton_profile on Profile {
        __id
        id
        is_followed
      }
    `
  )
)
