import { MockRelayRenderer_artist } from "__generated__/MockRelayRenderer_artist.graphql"
import { MockRelayRenderer_artwork } from "__generated__/MockRelayRenderer_artwork.graphql"
import { MockRelayRenderer_artworkMetadata } from "__generated__/MockRelayRenderer_artworkMetadata.graphql"
import { MockRelayRendererArtistQuery } from "__generated__/MockRelayRendererArtistQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import cheerio from "cheerio"
import { mount, render } from "enzyme"
import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { MockRelayRenderer, renderRelayTree } from "../MockRelayRenderer"

jest.unmock("react-relay")

const Metadata = createFragmentContainer(
  (props: { artworkMetadata: MockRelayRenderer_artworkMetadata }) => (
    <div>{props.artworkMetadata.title}</div>
  ),
  graphql`
    fragment MockRelayRenderer_artworkMetadata on Artwork {
      title
    }
  `
)

const Artwork = createFragmentContainer(
  (props: { artwork: MockRelayRenderer_artwork }) => (
    <div>
      <img src={props.artwork.image.url} />
      <Metadata artworkMetadata={props.artwork} />
      {props.artwork.artist && (
        <ArtistQueryRenderer id={props.artwork.artist.id} />
      )}
    </div>
  ),
  graphql`
    fragment MockRelayRenderer_artwork on Artwork {
      image {
        url
      }
      artist {
        id
      }
      ...MockRelayRenderer_artworkMetadata
    }
  `
)

const Artist = createFragmentContainer(
  (props: { artist: MockRelayRenderer_artist }) => (
    <div>{props.artist.name}</div>
  ),
  graphql`
    fragment MockRelayRenderer_artist on Artist {
      name
    }
  `
)

const ArtistQueryRenderer = (props: { id: string }) => (
  <ContextConsumer>
    {({ relayEnvironment }) => {
      return (
        <QueryRenderer<MockRelayRendererArtistQuery>
          environment={relayEnvironment}
          variables={props}
          query={graphql`
            query MockRelayRendererArtistQuery($id: String!) {
              artist(id: $id) {
                ...MockRelayRenderer_artist
              }
            }
          `}
          render={renderWithLoadProgress(Artist)}
        />
      )
    }}
  </ContextConsumer>
)

const query = graphql`
  query MockRelayRendererQuery {
    artwork(id: "mona-lisa") {
      ...MockRelayRenderer_artwork
    }
  }
`

function renderToString(element: React.ReactElement<any>) {
  return cheerio.html(render(element))
}

describe("MockRelayRenderer", () => {
  it("renders a Relay tree", done => {
    const tree = mount(
      <MockRelayRenderer
        Component={Artwork}
        query={query}
        mockResolvers={{
          Artwork: () => ({
            title: "Mona Lisa",
            image: {
              url: "http://test/image.jpg",
            },
            artist: null,
          }),
        }}
      />
    )
    setTimeout(() => {
      expect(tree.html()).toEqual(
        renderToString(
          <div>
            <img src="http://test/image.jpg" />
            <div>Mona Lisa</div>
          </div>
        )
      )
      done()
    }, 10)
  })

  describe("concerning renderRelayTree", () => {
    it("resolves a promise once the full tree (including nested query renderers) has been rendered", async () => {
      const tree = await renderRelayTree({
        Component: Artwork,
        query,
        mockResolvers: {
          Artwork: () => ({
            title: "Mona Lisa",
            image: {
              url: "http://test/image.jpg",
            },
            artist: {
              id: "leonardo-da-vinci",
            },
          }),
          Artist: () => ({
            name: "Leonardo da Vinci",
          }),
        },
      })
      expect(tree.html()).toEqual(
        renderToString(
          <div>
            <img src="http://test/image.jpg" />
            <div>Mona Lisa</div>
            <div>Leonardo da Vinci</div>
          </div>
        )
      )
    })

    it("resolves a promise once the optional `until` callback matches", async () => {
      class Component extends React.Component {
        state = {
          data: "",
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState({ data: "ohai" })
          }, 1000)
        }

        render() {
          return (
            <div>
              <div className="much-later">{this.state.data}</div>
              <div>{this.props.children}</div>
            </div>
          )
        }
      }

      const tree = await renderRelayTree({
        until: wrapper => wrapper.find(".much-later").text().length > 0,
        Component: Artwork,
        query,
        mockResolvers: {
          Artwork: () => ({
            title: "Mona Lisa",
            image: {
              url: "http://test/image.jpg",
            },
          }),
        },
        wrapper: renderer => <Component>{renderer}</Component>,
      })
      expect(tree.find(".much-later").text()).toEqual("ohai")
    })
  })
})
