import * as React from "react"
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
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
    const storeUpdater = (store: RecordSourceSelectorProxy, data: any) => {
      // Search the store for a record for the newly suggested artist, based on its ID we get from the response `data`.
      const suggestedArtist = store.get(data.followArtist.artistEdge.node.related.suggested.edges[0].node.__id)
      // Replace `artist` with the `suggestedArtist` in the list of `artists` on the `popular_artists` root field.
      const popularArtistsRootField = store.get("client:root:popular_artists")
      const popularArtists = popularArtistsRootField.getLinkedRecords("artists")
      const updatedPopularArtists = popularArtists.map(popularArtist => {
        return popularArtist.getDataID() === artist.__id ? suggestedArtist : popularArtist
      })
      popularArtistsRootField.setLinkedRecords(updatedPopularArtists, "artists")
    }

    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation ItemLinkFollowArtistMutation($input: FollowArtistInput!) {
          followArtist(input: $input) {
            artistEdge {
              node {
                __id
                related {
                  suggested(first: 1) {
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
          {<Avatar src={this.props.artist.image ? this.props.artist.image.cropped.url : ""} width={50} height={50} />}
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
