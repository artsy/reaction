import * as React from "react"
import { commitMutation, createFragmentContainer, graphql, QueryRenderer, RelayProp } from "react-relay"

import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink from "../../ItemLink"

export interface RelayProps {
  popular_artists: {
    artists?: any[]
  }
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, RelayProps {
  relay?: RelayProp
}

class PopularArtistsContent extends React.Component<Props, null> {
  onArtistFollowed(artistId: string, store: RecordSourceSelectorProxy, data: SelectorData): void {
    const suggestedArtist = store.get(data.followArtist.artist.related.suggested.edges[0].node.__id)

    const popularArtistsRootField = store.get("client:root:popular_artists")
    const popularArtists = popularArtistsRootField.getLinkedRecords("artists")
    const updatedPopularArtists = popularArtists.map(
      popularArtist => (popularArtist.getDataID() === artistId ? suggestedArtist : popularArtist)
    )

    popularArtistsRootField.setLinkedRecords(updatedPopularArtists, "artists")
  }

  onFollowedArtist(artist: any) {
    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation PopularArtistsFollowArtistMutation($input: FollowArtistInput!) {
          followArtist(input: $input) {
            artist {
              __id
              related {
                suggested(first: 1) {
                  edges {
                    node {
                      id
                      __id
                      name
                      image {
                        cropped(width: 100, height: 100) {
                          url
                        }
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
          artist_id: artist.id,
          unfollow: false,
        },
      },
      updater: (store: RecordSourceSelectorProxy, data: SelectorData) =>
        this.onArtistFollowed(artist.__id, store, data),
    })
  }

  render() {
    const artistItems = this.props.popular_artists.artists.map((artist, index) => (
      <ItemLink
        href="#"
        item={artist}
        key={index}
        id={artist.id}
        name={artist.name}
        image_url={artist.image && artist.image.cropped.url}
        onClick={() => this.onFollowedArtist(artist)}
      />
    ))

    return <div>{artistItems}</div>
  }
}

const PopularArtistContentContainer = createFragmentContainer(
  PopularArtistsContent,
  graphql`
    fragment PopularArtistsContent_popular_artists on PopularArtists {
      artists {
        id
        __id
        name
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
      }
    }
  `
)

const PopularArtistsComponent: React.SFC<ContextProps> = ({ relayEnvironment }) => {
  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query PopularArtistsQuery {
          popular_artists {
            ...PopularArtistsContent_popular_artists
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props) {
          return <PopularArtistContentContainer popular_artists={props.popular_artists} />
        } else {
          return null
        }
      }}
    />
  )
}

export const PopularArtists = ContextConsumer(PopularArtistsComponent)
