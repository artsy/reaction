import { MockRelayRendererFixtures_artist } from "__generated__/MockRelayRendererFixtures_artist.graphql"
import { MockRelayRendererFixtures_artwork } from "__generated__/MockRelayRendererFixtures_artwork.graphql"
import { MockRelayRendererFixtures_artworkMetadata } from "__generated__/MockRelayRendererFixtures_artworkMetadata.graphql"
import { MockRelayRendererFixturesArtistQuery } from "__generated__/MockRelayRendererFixturesArtistQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import cheerio from "cheerio"
import { render } from "enzyme"
import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

const Metadata = createFragmentContainer(
  (props: { artworkMetadata: MockRelayRendererFixtures_artworkMetadata }) => (
    <div>{props.artworkMetadata.title}</div>
  ),
  graphql`
    fragment MockRelayRendererFixtures_artworkMetadata on Artwork {
      title
    }
  `
)

export const Artwork = createFragmentContainer(
  (props: { artwork: MockRelayRendererFixtures_artwork }) => (
    <div>
      <img src={props.artwork.image.url} />
      <Metadata artworkMetadata={props.artwork} />
      {props.artwork.artist && (
        <ArtistQueryRenderer id={props.artwork.artist.id} />
      )}
    </div>
  ),
  graphql`
    fragment MockRelayRendererFixtures_artwork on Artwork {
      image {
        url
      }
      artist {
        id
      }
      ...MockRelayRendererFixtures_artworkMetadata
    }
  `
)

const Artist = createFragmentContainer(
  (props: { artist: MockRelayRendererFixtures_artist }) => (
    <div>{props.artist.name}</div>
  ),
  graphql`
    fragment MockRelayRendererFixtures_artist on Artist {
      name
    }
  `
)

const ArtistQueryRenderer = (props: { id: string }) => (
  <ContextConsumer>
    {({ relayEnvironment }) => {
      return (
        <QueryRenderer<MockRelayRendererFixturesArtistQuery>
          environment={relayEnvironment}
          variables={props}
          query={graphql`
            query MockRelayRendererFixturesArtistQuery($id: String!) {
              artist(id: $id) {
                ...MockRelayRendererFixtures_artist
              }
            }
          `}
          render={renderWithLoadProgress(Artist)}
        />
      )
    }}
  </ContextConsumer>
)

export const query = graphql`
  query MockRelayRendererFixturesQuery {
    artwork(id: "mona-lisa") {
      ...MockRelayRendererFixtures_artwork
    }
  }
`

export function renderToString(element: JSX.Element) {
  return cheerio.html(render(element))
}
