import { OtherWorks_artwork } from "__generated__/OtherWorks_artwork.graphql"
import { OtherWorksQuery } from "__generated__/OtherWorksQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ArtworkContextArtistQueryRenderer as ArtworkContextArtist } from "./ArtworkContexts/ArtworkContextArtist"
import { ArtworkContextAuctionQueryRenderer as ArtworkContextAuction } from "./ArtworkContexts/ArtworkContextAuction"
import { ArtworkContextFairQueryRenderer as ArtworkContextFair } from "./ArtworkContexts/ArtworkContextFair"
import { ArtworkContextPartnerShowQueryRenderer as ArtworkContextPartnerShow } from "./ArtworkContexts/ArtworkContextPartnerShow"

export const OtherWorks: React.SFC<{
  artwork: OtherWorks_artwork
}> = props => {
  const contextType = props.artwork.context && props.artwork.context.__typename

  // FIXME: Rename `artworkSlug` to artworkSlug
  const artworkSlug = props.artwork.id

  switch (contextType) {
    case "ArtworkContextAuction": {
      return (
        <ArtworkContextAuction
          artworkSlug={artworkSlug}
          artworkID={props.artwork._id}
          isClosed={props.artwork.sale.is_closed}
        />
      )
    }
    case "ArtworkContextFair": {
      return (
        <ArtworkContextFair
          artworkSlug={artworkSlug}
          artworkID={props.artwork._id}
        />
      )
    }
    case "ArtworkContextPartnerShow": {
      return (
        <ArtworkContextPartnerShow
          artworkSlug={artworkSlug}
          artworkID={props.artwork._id}
        />
      )
    }
    default: {
      return (
        <ArtworkContextArtist
          artworkSlug={artworkSlug}
          artworkID={props.artwork._id}
        />
      )
    }
  }
}

export const OtherWorksFragmentContainer = createFragmentContainer(
  OtherWorks,
  graphql`
    fragment OtherWorks_artwork on Artwork {
      id
      _id
      sale {
        is_closed
      }
      context {
        __typename
      }
    }
  `
)

export const OtherWorksQueryRenderer = ({
  artworkSlug,
}: {
  artworkSlug: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<OtherWorksQuery>
            environment={relayEnvironment}
            variables={{ artworkSlug }}
            query={graphql`
              query OtherWorksQuery($artworkSlug: String!) {
                artwork(id: $artworkSlug) {
                  ...OtherWorks_artwork
                }
              }
            `}
            render={renderWithLoadProgress(OtherWorksFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
