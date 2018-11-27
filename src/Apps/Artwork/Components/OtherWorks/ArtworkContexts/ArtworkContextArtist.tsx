import { ArtworkContextArtist_artwork } from "__generated__/ArtworkContextArtist_artwork.graphql"
import { ArtworkContextArtistQuery } from "__generated__/ArtworkContextArtistQuery.graphql"
import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../Header"
import {
  ArtistArtworkGrid,
  PartnerArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

interface ArtworkContextArtistProps {
  artwork: ArtworkContextArtist_artwork
}

export const ArtworkContextArtist: React.SFC<
  ArtworkContextArtistProps
> = props => {
  return (
    <>
      <Header
        title={`Other works by ${props.artwork.artist.name}`}
        buttonHref={sd.APP_URL + props.artwork.artist.href}
      />
      <ArtistArtworkGrid artwork={props.artwork} />
      <PartnerArtworkGrid />
      <RelatedWorksArtworkGrid />
    </>
  )
}

export const ArtworkContextArtistFragmentContainer = createFragmentContainer(
  ArtworkContextArtist,
  graphql`
    fragment ArtworkContextArtist_artwork on Artwork {
      id
      artist {
        name
        href
      }
      ...ArtistArtworkGrid_artwork
    }
  `
)

export const ArtworkContextArtistQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkContextArtistQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ArtworkContextArtistQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ArtworkContextArtist_artwork
                }
              }
            `}
            render={renderWithLoadProgress(
              ArtworkContextArtistFragmentContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
