import * as React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import track from "react-tracking"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import Events from "../../../../Utils/Events"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import { ContextConsumer, ContextProps } from "../../../Artsy"
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

export interface Props extends FollowProps {
  term: string
  tracking?: any
}

interface RelayProps extends React.HTMLProps<HTMLAnchorElement>, Props {
  relay?: RelayProp
  viewer: {
    match_artist: Artist[]
  }
}

@track({}, { dispatch: data => Events.postEvent(data) })
class ArtistSearchResultsContent extends React.Component<RelayProps, null> {
  private excludedArtistIds: Set<string>
  followCount: number = 0

  constructor(props: RelayProps, context: any) {
    super(props, context)
    this.excludedArtistIds = new Set(
      this.props.viewer.match_artist.map(item => item._id)
    )
  }

  onArtistFollowed(
    artist: Artist,
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

    const popularArtistsRootField = store.get("client:root:viewer")
    const popularArtists = popularArtistsRootField.getLinkedRecords(
      "match_artist",
      { term: this.props.term }
    )
    const updatedPopularArtists = popularArtists.map(
      artistItem =>
        artistItem.getDataID() === artist.__id ? artistToSuggest : artistItem
    )

    popularArtistsRootField.setLinkedRecords(
      updatedPopularArtists,
      "match_artist",
      { term: this.props.term }
    )

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Artist",
      entity_id: artist._id,
      entity_slug: artist.id,
      context_module: "onboarding search",
    })
  }

  onFollowedArtist(artist: Artist) {
    commitMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation ArtistSearchResultsArtistMutation(
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
      updater: (store: RecordSourceSelectorProxy, data: SelectorData) =>
        this.onArtistFollowed(artist, store, data),
    })
  }

  render() {
    const artistItems = this.props.viewer.match_artist.map((artist, index) => (
      <LinkContainer key={`artist-search-results-${index}`}>
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

const ArtistSearchResultsContentContainer = createFragmentContainer(
  ArtistSearchResultsContent,
  graphql`
    fragment ArtistSearchResultsContent_viewer on Viewer {
      match_artist(term: $term) {
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

const ArtistSearchResultsComponent: React.SFC<Props & ContextProps> = ({
  term,
  relayEnvironment,
  updateFollowCount,
}) => {
  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query ArtistSearchResultsQuery($term: String!) {
          viewer {
            ...ArtistSearchResultsContent_viewer
          }
        }
      `}
      variables={{ term }}
      render={({ error, props }) => {
        if (props) {
          return (
            <ArtistSearchResultsContentContainer
              viewer={props.viewer}
              term={term}
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

export const ArtistSearchResults = ContextConsumer(ArtistSearchResultsComponent)
