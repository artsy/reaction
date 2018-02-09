import * as React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import { track } from "../../../../Utils/track"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

export interface RelayProps {
  tracking?: any
  relay?: RelayProp
  popular_artists: {
    artists?: any[]
  }
}

interface Props
  extends React.HTMLProps<HTMLAnchorElement>,
    RelayProps,
    FollowProps {}

@track()
class PopularArtistsContent extends React.Component<Props, null> {
  private excludedArtistIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedArtistIds = new Set(
      this.props.popular_artists.artists.map(item => item._id)
    )
  }

  onArtistFollowed(
    artistId: string,
    store: RecordSourceSelectorProxy,
    data: SelectorData
  ): void {
    const suggestedArtistEdge =
      data.followArtist.artist.related.suggested.edges[0]
    const popularArtist = data.followArtist.popular_artists.artists[0]
    const artistToSuggest = store.get(
      ((suggestedArtistEdge && suggestedArtistEdge.node) || popularArtist).__id
    )
    this.excludedArtistIds.add(artistToSuggest.getValue("_id"))

    const popularArtistsRootField = store
      .get("client:root")
      .getLinkedRecord("popular_artists", { exclude_followed_artists: true })

    const updatedPopularArtists = popularArtistsRootField
      .getLinkedRecords("artists")
      .map(
        artist => (artist.getDataID() === artistId ? artistToSuggest : artist)
      )

    popularArtistsRootField.setLinkedRecords(updatedPopularArtists, "artists")

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Artist",
      entity_id: artistId,
      entity_slug: artistId,
      context_module: "onboarding recommended",
    })
  }

  onFollowedArtist(artist: any) {
    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation PopularArtistsFollowArtistMutation(
          $input: FollowArtistInput!
          $excludedArtistIds: [String]!
        ) {
          followArtist(input: $input) {
            popular_artists(
              size: 1
              exclude_followed_artists: true
              exclude_artist_ids: $excludedArtistIds
            ) {
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
            artist {
              __id
              related {
                suggested(
                  first: 1
                  exclude_followed_artists: true
                  exclude_artist_ids: $excludedArtistIds
                ) {
                  edges {
                    node {
                      id
                      _id
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
        excludedArtistIds: Array.from(this.excludedArtistIds),
      },
      updater: (store: RecordSourceSelectorProxy, data: SelectorData) =>
        this.onArtistFollowed(artist.__id, store, data),
    })
  }

  render() {
    const artistItems = this.props.popular_artists.artists.map(
      (artist, index) => (
        <LinkContainer>
          <ReplaceTransition
            key={index}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={400}
          >
            <ItemLink
              href="#"
              item={artist}
              key={artist.id}
              id={artist.id}
              name={artist.name}
              image_url={artist.image && artist.image.cropped.url}
              onClick={() => this.onFollowedArtist(artist)}
            />
          </ReplaceTransition>
        </LinkContainer>
      )
    )

    return <div>{artistItems}</div>
  }
}

const PopularArtistContentContainer = createFragmentContainer(
  PopularArtistsContent,
  graphql`
    fragment PopularArtistsContent_popular_artists on PopularArtists {
      artists {
        id
        _id
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

const PopularArtistsComponent: React.SFC<ContextProps & FollowProps> = ({
  relayEnvironment,
  updateFollowCount,
}) => {
  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query PopularArtistsQuery {
          popular_artists(exclude_followed_artists: true) {
            ...PopularArtistsContent_popular_artists
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props) {
          return (
            <PopularArtistContentContainer
              popular_artists={props.popular_artists}
              updateFollowCount={updateFollowCount}
            />
          )
        } else {
          return null
        }
      }}
    />
  )
}

export const PopularArtists = ContextConsumer(PopularArtistsComponent)
