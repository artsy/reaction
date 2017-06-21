import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay"

import * as Artsy from "../../components/artsy"
import { artsyNetworkLayer } from "../../relay/config"
import FilterArtworksQueryConfig from "../../relay/queries/filter_artworks"

import Dropdown from "../artwork_filter/dropdown"
import ArtworksFilter from "../artwork_filter/index"
import TotalCount from "../artwork_filter/total_count"

interface FilterArtworksDropdownState {
  selected: string
}

class FilterArtworksDropdown extends React.Component<DropdownRelayProps, FilterArtworksDropdownState> {
  constructor(props) {
    super(props)
    this.state = {
      selected: "",
    }
  }

  showSelection(count) {
    this.setState ({
      selected: count.name,
    })
  }

  render() {
    const dropdowns = this.props
      .filter_artworks
      .filter_artworks.aggregations.map(aggregation =>
        (
          <Dropdown
            aggregation={aggregation}
            key={aggregation.slice}
            onSelect={this.showSelection}
          />
        ),
      )

    const selected = <div>{this.state.selected}</div>

    return (
      <div>
        <div>{dropdowns}</div>
        <div style={{padding: "20px 0"}}>
          Selected: {selected}
        </div>
      </div>
    )
  }
}

const FilterArtworksDropdownContainer = Relay.createContainer(FilterArtworksDropdown, {
  fragments: {
    filter_artworks: () => Relay.QL`
      fragment on Viewer {
        filter_artworks(
          aggregations: [MEDIUM, GALLERY],
          artist_id: "christopher-williams"
        ) {
          aggregations {
            ${Dropdown.getFragment("aggregation")}
          }
        }
      }
    `,
  },
})

interface DropdownRelayProps {
  filter_artworks: {
    filter_artworks: {
      aggregations: Array<{
        slice: string | null,
        counts: {
          name: string | null,
          count: number | null,
          id: string | null,
        },
      } | null> | null,
    } | null,
  } | null,
}

class FilterArtworksTotalCount extends React.Component<TotalCountRelayProps, null> {
  render() {
    return (<TotalCount filter_artworks={this.props.filter_artworks.filter_artworks} />)
  }
}

const FilterArtworksTotalCountContainer = Relay.createContainer(FilterArtworksTotalCount, {
  fragments: {
    filter_artworks: () => Relay.QL`
      fragment on Viewer {
        filter_artworks(
          aggregations: [TOTAL],
          artist_id: "christopher-williams"
        ) {
          ${TotalCount.getFragment("filter_artworks")}
        }
      }
    `,
  },
})

interface TotalCountRelayProps {
  filter_artworks: {
    filter_artworks: {
      counts: {
        total: number | null,
      } | null,
    } | null,
  } | null,
}

function FilterArtworksDropdownExample() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Relay.RootContainer
      Component={FilterArtworksDropdownContainer}
      route={new FilterArtworksQueryConfig()}
    />
  )
}

function FilterArtworksTotalCountExample() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Relay.RootContainer
      Component={FilterArtworksTotalCountContainer}
      route={new FilterArtworksQueryConfig()}
    />
  )
}

function FilterArtworksExample() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <Artsy.ContextProvider currentUser={user}>
      <Relay.RootContainer
        Component={ArtworksFilter}
        route={new FilterArtworksQueryConfig()}
      />
    </Artsy.ContextProvider>
  )
}

storiesOf("Artwork Filter Components", Dropdown)
  .add("Filter dropdown", () => (
    <FilterArtworksDropdownExample />
  ))
  .add("Total Count", () => (
    <FilterArtworksTotalCountExample />
  ))
  .add("Artwork filter", () => (
    <FilterArtworksExample />
  ))
