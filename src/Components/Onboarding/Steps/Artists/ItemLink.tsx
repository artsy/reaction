import * as React from "react"
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay"
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime"
import styled, { StyledFunction } from "styled-components"

import { fadeIn, fadeOut } from "../../../../Assets/Animations"
import * as fonts from "../../../../Assets/Fonts"

import Icon from "../../../Icon"

const anchor: StyledFunction<State & React.HTMLProps<HTMLInputElement>> = styled.a
const Link = anchor`
  display: flex;
  font-size: 14px;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-family: ${fonts.primary.fontFamily};
  border-top: 1px solid #e5e5e5;
  &:hover {
    background-color: #f8f8f8;
  }
  ${props => (props.fadeIn ? fadeIn : null)}
  ${props => (props.fadeOut ? fadeOut : null)}
`

const Avatar = styled.img`
  padding: 10px 15px 10px 10px;
`

const FullWidthCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

export interface State {
  fadeIn: boolean
  fadeOut: boolean
  artist_id: string
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, RelayProps {
  relay?: RelayProp
}

interface ArtistFollowProps {
  id: string | null
  __id: string
}

class ItemLink extends React.Component<Props, State> {
  state = {
    fadeIn: false,
    fadeOut: false,
    artist_id: this.props.artist.id,
  }

  followArtist(artist: ArtistFollowProps) {
    const storeUpdater = (store: RecordSourceSelectorProxy) => {
      const mutationPayload = store.getRootField("followArtist")
      const origArtist = mutationPayload.getLinkedRecord("artistEdge")

      // Useful to import this directly for debugging
      const localConnHandler = ConnectionHandler

      // Somehow update the artist with the suggestion...
      const selectedArtist = store.get(artist.__id)
      const connection = localConnHandler.getConnection(origArtist, "ItemLink_suggested")
    }

    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation ItemLinkFollowArtistMutation($input: FollowArtistInput!) {
          followArtist(input: $input) {
            artistEdge {
              node {
                __id
                related {
                  suggested(first: 1) @connection(key: "ItemLink_suggested", filters: []) {
                    edges {
                      node {
                        ...ItemLink_artist
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        input: {
          artist_id: this.props.artist.id,
          unfollow: false,
        },
      },
      updater: storeUpdater,
      // optimisticUpdater: storeUpdater,
    })
  }

  followArtistFailed() {
    null
  }

  onClick() {
    this.followArtist(this.props.artist)
  }

  render() {
    return (
      <Link
        onClick={this.onClick.bind(this)}
        fadeIn={this.state.fadeIn}
        fadeOut={this.state.fadeOut}
        artist_id={this.props.artist.id}
      >
        <Col>
          {
            <Avatar
              src={
                this.props.artist.image
                  ? this.props.artist.image.cropped.url
                  : "https://www.artsy.net/images/icon-70.png"
              }
              width={50}
              height={50}
            />
          }
        </Col>
        <FullWidthCol>{this.props.artist.name}</FullWidthCol>
        <Col>
          <Icon name="follow-circle" color="black" fontSize="39px" />
        </Col>
      </Link>
    )
  }
}

export default createFragmentContainer(
  ItemLink,
  graphql`
    fragment ItemLink_artist on Artist {
      id
      __id
      name
      image {
        cropped(width: 100, height: 100) {
          url
        }
      }
    }
  `
)

export interface RelayProps {
  artist: {
    id: string | null
    __id: string
    name: string | null
    image: {
      cropped: {
        url: string | null
      } | null
    } | null
  }
}
