import { Box, Flex } from "@artsy/palette"
import { SearchBarSpike_viewer } from "__generated__/SearchBarSpike_viewer.graphql"
import { SearchBarSpikeSuggestQuery } from "__generated__/SearchBarSpikeSuggestQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import Input from "Components/Input"
import { SearchPreview } from "Components/Search/Previews"
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
  /* Holds current input */
  input: string
  /* For preview generation of selected items */
  entityID: string
  entityType: string
}

export class SearchBarSpike extends Component<Props, State> {
  state = {
    input: "",
    entityID: null,
    entityType: null,
  }

  // Throttled method to toggle previews.
  throttledOnSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return null
    const {
      node: { searchableType: entityType, id: entityID },
    } = suggestion
    this.setState({ entityType, entityID })
  }

  // Throttled method to perform refetch for new suggest query.
  throttledFetch = ({ value: term }) => {
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
    this.throttledOnSuggestionHighlighted = throttle(
      this.throttledOnSuggestionHighlighted,
      500,
      { leading: true }
    )
  }

  searchTextChanged = (_e, { newValue: input }) => {
    this.setState({ input })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ input: "", entityID: null, entityType: null })
  }

  // Navigate to selected search item.
  onSuggestionSelected = (
    _e,
    {
      suggestion: {
        node: { href },
      },
    }
  ) => {
    window.location.href = href
  }

  renderPreview() {
    const { entityID, entityType } = this.state
    if (entityID && entityType) {
      return <SearchPreview entityID={entityID} entityType={entityType} />
    }
  }

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    if (!query) return null
    return (
      <Box {...containerProps}>
        <Flex flexDirection={["column", "row"]}>
          <Box width={["100%", "25%"]}>
            <Flex flexDirection="column">
              <Box>Search "{query}"</Box>
              {children}
            </Flex>
          </Box>
          <Box width={["100%", "75%"]}>{this.renderPreview()}</Box>
        </Flex>
      </Box>
    )
  }

  renderSuggestion = ({ node: { displayLabel } }, { isHighlighted }) => {
    return (
      <span style={{ backgroundColor: isHighlighted ? "#ddd" : "#fff" }}>
        {displayLabel}
      </span>
    )
  }

  renderInputComponent = inputProps => (
    <Box>
      <Input style={{ width: "100%" }} {...inputProps} />
    </Box>
  )

  render() {
    const { viewer } = this.props
    const { input } = this.state
    const edges = get(viewer, v => v.search.edges, [])

    const inputProps = {
      onChange: this.searchTextChanged,
      placeholder: "Search by artist, gallery, style...",
      value: input,
    }

    return (
      <Autosuggest
        suggestions={edges}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionHighlighted={this.throttledOnSuggestionHighlighted}
        onSuggestionsFetchRequested={this.throttledFetch}
        getSuggestionValue={({ node: { displayLabel } }) => displayLabel}
        renderSuggestion={this.renderSuggestion}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        renderInputComponent={this.renderInputComponent}
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
              href
              ... on SearchableItem {
                searchableType
                id
              }
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
