import { Box } from "@artsy/palette"
import { ArtistCollectionsRailQuery } from "__generated__/ArtistCollectionsRailQuery.graphql"
import { useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { graphql } from "react-relay"
import { ArtistCollectionsRailFragmentContainer as ArtistCollectionsRail } from "./ArtistCollectionsRail"

interface Props {
  artistID: string
  isFeaturedArtistContent?: boolean
}

export const ArtistCollectionsRailContent: React.SFC<Props> = passedProps => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box mb={3}>
      <QueryRenderer<ArtistCollectionsRailQuery>
        environment={relayEnvironment}
        variables={{
          isFeaturedArtistContent: true,
          size: 16,
          artistID: passedProps.artistID,
        }}
        query={graphql`
          query ArtistCollectionsRailQuery(
            $isFeaturedArtistContent: Boolean
            $size: Int
            $artistID: String
          ) {
            collections: marketingCollections(
              isFeaturedArtistContent: $isFeaturedArtistContent
              size: $size
              artistID: $artistID
            ) {
              ...ArtistCollectionsRail_collections
            }
          }
        `}
        render={renderWithLoadProgress(ArtistCollectionsRail)}
        cacheConfig={{ force: true }}
      />
    </Box>
  )
}
