import { MarketingCollectionsPreview_artist } from "__generated__/MarketingCollectionsPreview_artist.graphql"
import { MarketingCollectionsPreviewQuery } from "__generated__/MarketingCollectionsPreviewQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

interface MarketingCollectionsPreviewProps {
  artist: MarketingCollectionsPreview_artist
}

export const MarketingCollectionsPreview: React.SFC<
  MarketingCollectionsPreviewProps
> = ({ artist }) => {
  return (
    <>
      <h1>Collections</h1>
      {artist.marketingCollections.map(({ title }, index) => {
        return <div key={index}>{title}</div>
      })}
    </>
  )
}

export const MarketingCollectionsPreviewFragmentContainer = createFragmentContainer(
  MarketingCollectionsPreview,
  graphql`
    fragment MarketingCollectionsPreview_artist on Artist {
      marketingCollections {
        title
        slug
        headerImage
      }
    }
  `
)

export const MarketingCollectionsPreviewQueryRenderer: React.SFC<{
  entityID: string
}> = ({ entityID }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<MarketingCollectionsPreviewQuery>
            environment={relayEnvironment}
            variables={{
              entityID,
            }}
            query={graphql`
              query MarketingCollectionsPreviewQuery($entityID: String!) {
                artist(id: $entityID) {
                  ...MarketingCollectionsPreview_artist
                }
              }
            `}
            render={renderWithLoadProgress(
              MarketingCollectionsPreviewFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
