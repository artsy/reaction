import { PopularArtistsContent_popular_artists } from "__generated__/PopularArtistsContent_popular_artists.graphql"
import {
  PopularArtistsFollowArtistMutation,
  PopularArtistsFollowArtistMutationResponse,
} from "__generated__/PopularArtistsFollowArtistMutation.graphql"
import { PopularArtistsQuery } from "__generated__/PopularArtistsQuery.graphql"
import { ContextProps, withContext } from "Artsy"
import * as React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import track from "react-tracking"
import { RecordSourceSelectorProxy } from "relay-runtime"
import Events from "../../../../Utils/Events"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

interface Artist {
  id: string | null
  _id: string | null
  __id: string | null
  name: string | null
  image: {
    cropped: {
      url: string | null
    }
  } | null
}

export interface RelayProps {
  tracking?: any
  relay?: RelayProp
  popular_artists: PopularArtistsContent_popular_artists
}

interface Props
  extends React.HTMLProps<HTMLAnchorElement>,
    RelayProps,
    FollowProps {}

@track({}, { dispatch: data => Events.postEvent(data) })
class PopularArtistsContent extends React.Component<Props, null> {
  private excludedArtistIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedArtistIds = new Set(
      this.props.popular_artists.artists.filter(Boolean).map(item => item._id)
    )
  }

  onArtistFollowed(
    artist: Artist,
    store: RecordSourceSelectorProxy,
    data: PopularArtistsFollowArtistMutationResponse
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
      .filter(Boolean)
      .map(
        artistItem =>
          artistItem.getDataID() === artist.__id ? artistToSuggest : artistItem
      )

    popularArtistsRootField.setLinkedRecords(updatedPopularArtists, "artists")

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Artist",
      entity_id: artist._id,
      entity_slug: artist.id,
      context_module: "onboarding recommended",
    })
  }

  onFollowedArtist(artist: Artist) {
    commitMutation<PopularArtistsFollowArtistMutation>(
      this.props.relay.environment,
      {
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
        updater: (store, data) => this.onArtistFollowed(artist, store, data),
      }
    )
  }

  render() {
    const artistItems = this.props.popular_artists.artists
      .filter(Boolean)
      .map((artist, index) => (
        <LinkContainer key={`popular-artists-${index}`}>
          <ReplaceTransition
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
    <QueryRenderer<PopularArtistsQuery>
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

export const PopularArtists = withContext(PopularArtistsComponent)
