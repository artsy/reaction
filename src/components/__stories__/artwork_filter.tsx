import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../relay/config"
import { FilterArtworksQueryConfig } from "../../relay/root_queries"

import Dropdown from "../artwork_filter/dropdown"

export class FilterArtworks extends React.Component<RelayProps, null> {
  render() {
    let dropdowns = []
    this.props.filter_artworks.filter_artworks.aggregations.forEach((aggregation) => {
      dropdowns.push(<Dropdown aggregation={aggregation}/>)
    })
    return (
      <div style={{display: 'inline-block'}}>
        {dropdowns}
      </div>
    )
  }
}

const FilterArtworksContainer = Relay.createContainer(FilterArtworks, {
  fragments: {
    filter_artworks: () => Relay.QL`
      fragment on Viewer {
        filter_artworks(
          aggregations: [MEDIUM, GALLERY], 
          artist_id: "christopher-williams"
        ) {
          aggregations {
            ${Dropdown.getFragment('aggregation')}
          }
        }
      }
    `,
  },
})

interface RelayProps {
  filter_artworks: {
    filter_artworks: {
      aggregations: Array<{
        slice: string | null,
        counts: {
          name: string | null,
          count: number | null,
          id: string | null,
        }
      } | null> | null,
    } | null,
  } | null,
}

function FilterArtworksExample(props: { aggregations: [string] }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Relay.RootContainer
      Component={FilterArtworksContainer}
      route={new FilterArtworksQueryConfig()}
    />
  )
}

storiesOf("Artwork Filter Components", Dropdown)
  .add("Filter dropdown", () => (
    <FilterArtworksExample aggregations={['TOTAL', 'MEDIUM']}/>
  ))
