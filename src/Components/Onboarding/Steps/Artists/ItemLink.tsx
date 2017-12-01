import * as React from "react"
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import styled from "styled-components"

import * as fonts from "../../../../Assets/Fonts"

import Icon from "../../../Icon"

const Link = styled.a`
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

interface Props extends React.HTMLProps<HTMLAnchorElement>, RelayProps {
  relay?: RelayProp
  // TODO: Promote this interface to e.g. onItemFollowed() when adding support for following Artist/Gene.
  onArtistFollowed(artist: string, store: RecordSourceSelectorProxy, data: SelectorData): void
}

// TODO: Promote this interface to e.g. Item as a more generalized interface for ItemLink.
interface Artist {
  id: string | null
  __id: string
}

class ItemLink extends React.Component<Props, null> {
  followArtist(artist: Artist) {
    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation ItemLinkFollowArtistMutation($input: FollowArtistInput!) {
          followArtist(input: $input) {
            artist {
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
      `,
      variables: {
        input: {
          artist_id: this.props.artist.id,
          unfollow: false,
        },
      },
      updater: (store: RecordSourceSelectorProxy, data: SelectorData) =>
        this.props.onArtistFollowed(artist.__id, store, data),
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
      <Link onClick={this.onClick.bind(this)}>
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
