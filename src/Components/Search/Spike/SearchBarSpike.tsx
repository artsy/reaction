import { SearchBarSpike_viewer } from "__generated__/SearchBarSpike_viewer.graphql"
import { SearchBarSpikeSuggestQuery } from "__generated__/SearchBarSpikeSuggestQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import { throttle } from "lodash"
import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"
import { get } from "Utils/get"

export interface Props extends ContextProps {
  relay: RelayRefetchProp
  viewer: SearchBarSpike_viewer
}

interface State {
  input: string
}

export class SearchBarSpike extends Component<Props, State> {
  state = {
    input: "",
  }

  throttledFetch = term => {
    this.props.relay.refetch(
      {
        term,
        hasTerm: true,
      },
      null,
      error => {
        if (error) console.error(error)
      }
    )
  }

  componentDidMount() {
    this.throttledFetch = throttle(this.throttledFetch, 500, {
      leading: true,
    })
  }

  searchTextChanged = (_e, { newValue: input }) => {
    this.setState({ input })
  }

  render() {
    const { viewer } = this.props
    const edges = get(viewer, v => v.search.edges, [])

    const inputProps = {
      onChange: this.searchTextChanged,
      placeholder: "Search...",
      value: this.state.input,
    }

    return (
      <Autosuggest
        suggestions={edges}
        onSuggestionsClearRequested={() => {
          /* */
        }}
        onSuggestionsFetchRequested={({ value }) => this.throttledFetch(value)}
        getSuggestionValue={() => {
          /* */
        }}
        renderSuggestion={({ node }) => {
          return <span>{node.displayLabel}</span>
        }}
        inputProps={inputProps}
      />
    )
  }
}

export const SearchBarRefetchContainer = createRefetchContainer(
  SearchBarSpike,
  {
    viewer: graphql`
      fragment SearchBarSpike_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
        ) {
        search(query: $term, mode: AUTOSUGGEST, first: 10)
          @include(if: $hasTerm) {
          edges {
            node {
              displayLabel
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchBarSpikeRefetchQuery($term: String!, $hasTerm: Boolean!) {
      viewer {
        ...SearchBarSpike_viewer @arguments(term: $term, hasTerm: $hasTerm)
      }
    }
  `
)

export const SearchBarSpikeQueryRenderer: React.SFC = () => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<SearchBarSpikeSuggestQuery>
            environment={relayEnvironment}
            query={graphql`
              query SearchBarSpikeSuggestQuery(
                $term: String!
                $hasTerm: Boolean!
              ) {
                viewer {
                  ...SearchBarSpike_viewer
                    @arguments(term: $term, hasTerm: $hasTerm)
                }
              }
            `}
            variables={{
              term: "",
              hasTerm: false,
            }}
            render={({ props }) => {
              if (props) {
                return <SearchBarRefetchContainer viewer={props.viewer} />
              } else {
                return null
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
