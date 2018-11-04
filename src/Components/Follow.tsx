/**
 * FIXME: This file also used to handle ‘profile’ follows, as implemented in https://github.com/artsy/reaction/pull/175,
 * but this was reverted because the metaphysics PR never landed https://github.com/artsy/metaphysics/pull/662.
 *
 * When this is revisited, rather than having this file do both, it’s probably better to have an abstract implementation
 * and two specialised components that use composition to achieve the desired functionality.
 */

import { Follow_artist } from "__generated__/Follow_artist.graphql"
import { FollowArtistMutation } from "__generated__/FollowArtistMutation.graphql"
import * as Artsy from "Artsy/SystemContext"
import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import styled from "styled-components"
import colors from "../Assets/Colors"
import Icon from "./Icon"

const SIZE = 32

interface Props
  extends React.HTMLProps<FollowButton>,
    Artsy.SystemContextProps {
  style?: any
  relay: RelayProp
  artist: Follow_artist
}

export const StyledFollowButton = styled.div`
  display: flex;
  cursor: pointer;
  color: black;
  font-size: 16px;
  align-items: center;
  margin-left: 5px;

  &::after {
    content: "Follow";
  }

  &:hover {
    color: ${colors.purpleRegular};
  }

  &[data-followed="true"] {
    &::after {
      content: "Following";
    }

    &:hover {
      color: ${colors.redBold};

      &::after {
        content: "Unfollow";
      }
    }
  }
`

export class FollowButton extends React.Component<Props, null> {
  handleFollow() {
    const { artist, user, relay } = this.props
    if (user && user.id) {
      commitMutation<FollowArtistMutation>(relay.environment, {
        mutation: graphql`
          mutation FollowArtistMutation($input: FollowArtistInput!) {
            followArtist(input: $input) {
              artist {
                __id
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
        // TODO: Relay Modern: This is not working yet
        optimisticResponse: {
          followArtist: {
            artist: {
              __id: artist.__id,
              is_followed: !artist.is_followed,
            },
          },
        },
      })
    } else {
      window.location.href = "/login"
    }
  }

  render() {
    const { style, artist } = this.props
    const iconName = artist.is_followed
      ? "follow-circle.is-following"
      : "follow-circle"

    return (
      <StyledFollowButton
        className={this.props.className}
        style={style}
        onClick={() => this.handleFollow()}
        data-followed={artist.is_followed}
      >
        <Icon
          name={iconName}
          height={SIZE}
          style={{ verticalAlign: "middle", color: "inherit", margin: 0 }}
        />
      </StyledFollowButton>
    )
  }
}

export default createFragmentContainer(
  Artsy.withSystemContext(FollowButton),
  graphql`
    fragment Follow_artist on Artist {
      __id
      id
      is_followed
    }
  `
)
