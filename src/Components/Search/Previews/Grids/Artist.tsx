import { ArtistSearchPreview_artist } from "__generated__/ArtistSearchPreview_artist.graphql"
import { ArtistSearchPreviewQuery } from "__generated__/ArtistSearchPreviewQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

interface ArtistSearchPreviewProps {
  artist: ArtistSearchPreview_artist
}

export class ArtistSearchPreview extends React.Component<
  ArtistSearchPreviewProps
> {
  render() {
    const { marketingCollections, artworks_connection } = this.props.artist

    if (marketingCollections.length > 0) {
      return (
        <>
          <h1>Collections</h1>
          {marketingCollections.map(({ title }, index) => {
            return <div>{title}</div>
          })}
        </>
      )
    }

    return (
      <ArtworkGrid artworks={artworks_connection} columnCount={[2, 3, 4]} />
    )
  }
}

export const ArtistSearchPreviewFragmentContainer = createFragmentContainer(
  ArtistSearchPreview,
  graphql`
    fragment ArtistSearchPreview_artist on Artist {
      id
      marketingCollections {
        title
      }
      artworks_connection(
        first: 8
        filter: [IS_FOR_SALE]
        sort: PUBLISHED_AT_DESC
      ) {
        ...ArtworkGrid_artworks
      }
    }
  `
)

export const ArtistSearchPreviewQueryRenderer: React.SFC<{
  entityID: string
}> = ({ entityID }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtistSearchPreviewQuery>
            environment={relayEnvironment}
            variables={{
              entityID,
            }}
            query={graphql`
              query ArtistSearchPreviewQuery($entityID: String!) {
                artist(id: $entityID) {
                  ...ArtistSearchPreview_artist
                }
              }
            `}
            render={renderWithLoadProgress(
              ArtistSearchPreviewFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
