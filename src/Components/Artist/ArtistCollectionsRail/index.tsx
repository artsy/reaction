import { ArtistCollectionsRailQuery } from "__generated__/ArtistCollectionsRailQuery.graphql"
import { SystemContextConsumer } from "Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { ArtistCollectionsRailFragmentContainer as ArtistCollectionsRail } from "./ArtistCollectionsRail"

interface Props {
  artistID: string
  isFeaturedArtistContent?: boolean
}

export const ArtistCollectionsRailContent: React.SFC<Props> = passedProps => {
  return (
    <SystemContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtistCollectionsRailQuery>
            environment={relayEnvironment}
            variables={{
              isFeaturedArtistContent: true,
              size: 8,
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
            render={({ props }) => {
              if (props) {
                return <ArtistCollectionsRail {...props} />
              } else {
                return null
              }
            }}
            cacheConfig={{ force: true }}
          />
        )
      }}
    </SystemContextConsumer>
  )
}
