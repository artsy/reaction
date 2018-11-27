import { Box, Sans } from "@artsy/palette"
import { OtherWorks_artwork } from "__generated__/OtherWorks_artwork.graphql"
import { OtherWorksQuery } from "__generated__/OtherWorksQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import {
  ArtworkContextArtist,
  ArtworkContextAuction,
  ArtworkContextFair,
  ArtworkContextPartnerShow,
} from "./ArtworkContexts"

interface OtherWorksProps {
  artwork: OtherWorks_artwork
}

export const OtherWorks: React.SFC<OtherWorksProps> = props => {
  const contextType = props.artwork.context && props.artwork.context.__typename
  const ArtworkContext = getArtworkContextComponent(contextType)

  return (
    <>
      <ArtworkContext artworkID={props.artwork.id} />

      {/* Debugger */}
      <Box mt={6}>
        <Sans size="3">{props.artwork.id}</Sans>
        <Sans size="3">{contextType}</Sans>
      </Box>
    </>
  )
}

const getArtworkContextComponent = (context: string | boolean): any => {
  // FIXME: add type
  switch (context) {
    case "ArtworkContextAuction":
      return ArtworkContextAuction
    case "ArtworkContextFair":
      return ArtworkContextFair
    case "ArtworkContextPartnerShow":
      return ArtworkContextPartnerShow
    default:
      return ArtworkContextArtist
  }
}

export const OtherWorksFragmentContainer = createFragmentContainer(
  OtherWorks,
  graphql`
    fragment OtherWorks_artwork on Artwork {
      id
      context {
        __typename
      }
      ...ArtworkContextArtist_artwork
    }
  `
)

export const OtherWorksQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<OtherWorksQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query OtherWorksQuery($artworkID: String!) {
                artwork(id: $artworkID) {
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
