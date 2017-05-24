import * as React from "react"
import * as Relay from "react-relay"

import Artworks from "../artwork_grid"
import ArtistRow from "./artist_row"

const PageSize = 10

interface Props extends RelayProps, React.HTMLProps<GeneContents> {
  gene: any
}

export class GeneContents extends React.Component<Props, null> {

  render() {

    let artists = this.props.gene.artists.edges.map(edge => {
      return (
        <ArtistRow artist={edge.node as any} key={edge.__dataID__} />
      )
    })

    return (
      <div>
        {artists}
      </div>
    )
  }
}

export default Relay.createContainer(GeneContents, {
  initialVariables: {
    showArtists: true,
    artworksSize: PageSize,
    artistsSize: PageSize,
    medium: "*",
    aggregations: ["MEDIUM", "TOTAL", "PRICE_RANGE", "DIMENSION_RANGE"],
    price_range: "*",
    dimension_range: "*",
    sort: "-partner_updated_at",
  },
  fragments: {
    gene: () => Relay.QL`
      fragment on Gene {
        mode
        name
        artists: artists_connection(first: $artistsSize) @include(if: $showArtists) {
          edges {
            node {
              ${ArtistRow.getFragment("artist")}
            }
          }
        }
        artworks: artworks_connection(
          first: $artworksSize,
          aggregations: $aggregations, 
          medium: $medium,
          price_range: $price_range,
          dimension_range: $dimension_range,
          sort: $sort,
        ) @skip(if: $showArtists) {
          ${Artworks.getFragment("artworks")}
        }
      }
    `,
  },
})

interface RelayProps {
  gene: {
    mode: string | null,
    name: string | null,
  } | any
}
