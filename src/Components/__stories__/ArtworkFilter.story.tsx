import { storiesOf } from "@storybook/react"
import * as React from "react"
import { injectNetworkLayer, Store } from "react-relay/classic"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay/compat"

import * as Artsy from "../../Components/Artsy"
import { artsyNetworkLayer } from "../../Relay/config"

import ArtworkFilter from "../ArtworkFilter"
import Dropdown from "../ArtworkFilter/Dropdown"
import TotalCount from "../ArtworkFilter/TotalCount"

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
    this.setState({
      selected: count.name,
    })
  }

  render() {
    const dropdowns = this.props.filter_artworks.filter_artworks.aggregations.map(aggregation => (
      <Dropdown aggregation={aggregation} key={aggregation.slice} onSelect={this.showSelection.bind(this)} />
    ))

    const selected = <div>{this.state.selected}</div>

    return (
      <div>
        <div>{dropdowns}</div>
        <div style={{ padding: "20px 0" }}>Selected: {selected}</div>
      </div>
    )
  }
}

const FilterArtworksDropdownContainer = createFragmentContainer(
  FilterArtworksDropdown,
  graphql`
    fragment ArtworkFilter_filter_artworks on Viewer {
      filter_artworks(aggregations: [MEDIUM, GALLERY], artist_id: "christopher-williams") {
        aggregations {
          slice
          ...Dropdown_aggregation
        }
      }
    }
  `
)

interface DropdownRelayProps {
  filter_artworks: {
    filter_artworks: {
      aggregations: Array<{
        slice: string | null
      } | null> | null
    } | null
  } | null
}

function FilterArtworksDropdownExample() {
  injectNetworkLayer(artsyNetworkLayer())
  return (
    <QueryRenderer
      environment={Store as any}
      query={graphql`
        query ArtworkFilterDropdownExampleQuery {
          viewer {
            ...ArtworkFilter_viewer
          }
        }
      `}
      variables={{}}
      render={readyState => {
        return readyState.props && <FilterArtworksDropdownContainer {...readyState.props as any} />
      }}
    />
  )
}

function FilterArtworksTotalCountExample() {
  injectNetworkLayer(artsyNetworkLayer())
  return (
    <QueryRenderer
      environment={Store as any}
      query={graphql`
        query ArtworkFilterTotalCountExampleQuery {
          viewer {
            filter_artworks(aggregations: [TOTAL], artist_id: "christopher-williams") {
              ...TotalCount_filter_artworks
            }
          }
        }
      `}
      variables={{}}
      render={readyState => {
        return readyState.props && <TotalCount {...readyState.props.viewer as any} />
      }}
    />
  )
}

function FilterArtworksExample() {
  injectNetworkLayer(artsyNetworkLayer())
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <Artsy.ContextProvider currentUser={user}>
      <QueryRenderer
        environment={Store as any}
        query={graphql`
          query ArtworkFilterExampleQuery {
            viewer {
              ...ArtworkFilter_filter_artworks
            }
          }
        `}
        variables={{}}
        render={readyState => {
          return readyState.props && <ArtworkFilter {...readyState.props as any} />
        }}
      />
    </Artsy.ContextProvider>
  )
}

storiesOf("Components/Artwork/Artwork Filter Components", module)
  .add("All Artworks - Artwork filter", () => <FilterArtworksExample />)
  .add("Filter dropdown", () => <FilterArtworksDropdownExample />)
  .add("Total Count", () => <FilterArtworksTotalCountExample />)
