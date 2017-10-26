/**
 * FIXME: This file also used to handle ‘profile’ follows, as implemented in https://github.com/artsy/reaction/pull/175,
 * but this was reverted because the metaphysics PR never landed https://github.com/artsy/metaphysics/pull/662.
 *
 * When this is revisited, rather than having this file do both, it’s probably better to have an abstract implementation
 * and two specialised components that use composition to achieve the desired functionality.
 */

import * as React from "react"
import * as Relay from "react-relay/classic"

import Icon from "./Icon"

import styled from "styled-components"
import colors from "../Assets/Colors"

import * as Artsy from "../Components/Artsy"

const SIZE = 32

interface Props extends RelayProps, React.HTMLProps<FollowButton>, Artsy.ContextProps {
  style?: any
  relay?: any
  type: string
}

export class FollowButton extends React.Component<Props, null> {
  handleFollow() {
    const { currentUser, relay, type } = this.props
    if (currentUser && currentUser.id) {
      relay.commitUpdate(new mutationTypes[type]({ [type]: this.props[type] }))
    } else {
      window.location.href = "/login"
    }
  }

  render() {
    const { style, type } = this.props
    const followable = this.props[type]

    const iconName = followable.is_followed ? "follow-circle.is-following" : "follow-circle"

    return (
      <div
        className={this.props.className}
        style={style}
        onClick={() => this.handleFollow()}
        data-followed={followable.is_followed}
      >
        <Icon name={iconName} height={SIZE} style={{ verticalAlign: "middle", color: "inherit", margin: 0 }} />
      </div>
    )
  }
}

interface RelayProps {
  artist?:
    | {
        is_followed: boolean | null
      }
    | any
}

export const StyledFollowButton = styled(FollowButton)`
  display: flex;
  cursor: pointer;
  color: black;
  font-size: 16px;
  align-items: center;
  margin-left: 5px;
  &:after {
    content: "Follow";
  }
  &:hover {
    color: ${colors.purpleRegular};
  }
  &[data-followed="true"] {
    &:after {
      content: "Following";
    }
    &:hover {
      color: ${colors.redBold};
      &:after {
        content: "Unfollow";
      }
    }
  }
`
class FollowArtistMutation extends Relay.Mutation<Props, null> {
  static fragments = {
    artist: () => Relay.QL`
      fragment on Artist {
        __id
        id
        is_followed
      }
    `,
  }

  getMutation() {
    return Relay.QL`mutation{followArtist}`
  }

  getVariables() {
    return {
      artist_id: this.props.artist.id,
      unfollow: this.props.artist.is_followed ? true : false,
    }
  }

  getOptimisticResponse() {
    return {
      artist: {
        __id: this.props.artist.__id,
        is_followed: this.props.artist.is_followed ? false : true,
      },
    }
  }

  // __id needs to be explictly added here because of our Relay fork
  // If __id is not here, Relay will try to use `id` to match up value
  // that is returned with its cached version (instead of using `__id`)
  getFatQuery() {
    return Relay.QL`
      fragment on FollowArtistPayload {
        artist {
          __id
          is_followed
        }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: "FIELDS_CHANGE",
        fieldIDs: {
          artist: this.props.artist.__id,
        },
      },
    ]
  }
}

const mutationTypes = {
  artist: FollowArtistMutation,
}

export default Relay.createContainer(Artsy.ContextConsumer(StyledFollowButton), {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        __id
        is_followed
        ${FollowArtistMutation.getFragment("artist")}
      }
    `,
  },
})
