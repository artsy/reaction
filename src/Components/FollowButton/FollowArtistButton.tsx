import { Box, ButtonProps } from "@artsy/palette"
import { FollowArtistButtonMutation } from "__generated__/FollowArtistButtonMutation.graphql"
import * as Artsy from "Artsy/SystemContext"
import { extend } from "lodash"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import styled from "styled-components"
import { FollowArtistPopoverFragmentContainer as SuggestionsPopover } from "Styleguide/Components/FollowArtistPopover"
import { FollowArtistButton_artist } from "../../__generated__/FollowArtistButton_artist.graphql"
import { FollowButton } from "./Button"
import { FollowButtonDeprecated } from "./ButtonDeprecated"
import { FollowTrackingData } from "./Typings"

import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

interface Props
  extends React.HTMLProps<FollowArtistButton>,
    Artsy.ContextProps {
  relay?: RelayProp
  artist?: FollowArtistButton_artist
  tracking?: TrackingProp
  trackingData?: FollowTrackingData
  onOpenAuthModal?: (type: "register" | "login", config?: object) => void

  /**
   * FIXME: Default is true due to legacy code. If false, use new @artsy/palette
   * design system <Button /> style.
   */
  useDeprecatedButtonStyle?: boolean
  /**
   * FIXME: If useDeprecatedButtonStyle is false pass <Button> style props along
   * to new design-system buttons.
   */
  buttonProps?: Partial<ButtonProps>
  /**
   * Custom renderer for alternative button displays
   */
  render?: (artist: FollowArtistButton_artist) => JSX.Element
  triggerSuggestions?: boolean
}

interface State {
  openSuggestions: boolean
}

const SuggestionsPopoverContainer = styled(Box)`
  position: absolute;
  z-index: 1;
`

export class FollowArtistButton extends React.Component<Props, State> {
  static defaultProps = {
    useDeprecatedButtonStyle: true,
    buttonProps: {},
    triggerSuggestions: false,
  }

  state = { openSuggestions: false }

  trackFollow = () => {
    const {
      tracking,
      artist: { is_followed },
    } = this.props
    const trackingData: FollowTrackingData = this.props.trackingData || {}
    const action = is_followed ? "Unfollowed Artist" : "Followed Artist"

    tracking.trackEvent(extend({ action }, trackingData))
  }

  handleFollow = e => {
    e.preventDefault() // If this button is part of a link, we _probably_ dont want to actually follow the link.
    const {
      artist,
      user,
      relay,
      onOpenAuthModal,
      triggerSuggestions,
    } = this.props

    if (user && user.id) {
      const newFollowCount = artist.is_followed
        ? artist.counts.follows - 1
        : artist.counts.follows + 1

      commitMutation<FollowArtistButtonMutation>(relay.environment, {
        mutation: graphql`
          mutation FollowArtistButtonMutation($input: FollowArtistInput!) {
            followArtist(input: $input) {
              artist {
                __id
                is_followed
                counts {
                  follows
                }
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
              counts: { follows: newFollowCount },
            },
          },
        },
        updater: (store: RecordSourceSelectorProxy, data: SelectorData) => {
          const artistProxy = store.get(data.followArtist.artist.__id)

          artistProxy
            .getLinkedRecord("counts")
            .setValue(newFollowCount, "follows")
        },
      })
      this.trackFollow()
      if (triggerSuggestions && !artist.is_followed) {
        this.setState({ openSuggestions: true })
      }
    } else {
      if (onOpenAuthModal) {
        onOpenAuthModal("register", {
          contextModule: "intext tooltip",
          intent: "follow artist",
          copy: "Sign up to follow artists",
        })
      }
    }
  }

  closePopover() {
    this.setState({ openSuggestions: false })
  }

  render() {
    const {
      artist,
      useDeprecatedButtonStyle,
      buttonProps,
      render,
      user,
    } = this.props
    const { openSuggestions } = this.state
    // FIXME: Unify design language
    const Button = useDeprecatedButtonStyle
      ? FollowButtonDeprecated
      : FollowButton

    // Custom button renderer
    const content = render ? (
      <span onClick={this.handleFollow}> {render(artist)}</span>
    ) : (
      <Button
        isFollowed={artist && artist.is_followed}
        handleFollow={this.handleFollow}
        buttonProps={buttonProps}
      />
    )

    return (
      <>
        {content}
        {openSuggestions && (
          <SuggestionsPopoverContainer>
            <SuggestionsPopover
              user={user}
              suggested={artist}
              onClose={() => this.closePopover()}
            />
          </SuggestionsPopoverContainer>
        )}
      </>
    )
  }
}

export const FollowArtistButtonFragmentContainer = track({})(
  createFragmentContainer(
    Artsy.withContext(FollowArtistButton),
    graphql`
      fragment FollowArtistButton_artist on Artist
        @argumentDefinitions(
          showFollowSuggestions: { type: "Boolean", defaultValue: false }
        ) {
        __id
        id
        is_followed
        counts {
          follows
        }
        ...FollowArtistPopover_suggested @include(if: $showFollowSuggestions)
      }
    `
  )
)
