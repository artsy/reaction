import { Box, Flex } from "@artsy/palette"
import { SearchBar_viewer } from "__generated__/SearchBar_viewer.graphql"
import { SearchBarSuggestQuery } from "__generated__/SearchBarSuggestQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import colors from "Assets/Colors"
import Input from "Components/Input"
import { SearchPreview } from "Components/Search/Previews"
import { SuggestionItem } from "Components/Search/Suggestions/SuggestionItem"
import { throttle } from "lodash"
import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"
import styled from "styled-components"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { SuggestionItemContainer } from "./Suggestions/SuggestionItemContainer"

const logger = createLogger("Components/Search/SearchBar")

const AutosuggestContainer = styled(Box)`
  div[role="combobox"] {
    div[role="listbox"] {
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    }
  }
`

export interface Props extends ContextProps {
  relay: RelayRefetchProp
  viewer: SearchBar_viewer
}

const PLACEHOLDER = "Search by artist, gallery, style, theme, tag, etc."

interface State {
  /* Holds current input */
  term: string
  /* For preview generation of selected items */
  entityID: string
  entityType: string
  focused: boolean
}

const AutosuggestWrapper = styled(Box)`
  position: relative;
`

const ResultsWrapper = styled(Box)`
  background-color: ${colors.white};
  display: flex;
  border: 1px solid ${colors.grayRegular};
  position: absolute;
`

const SuggestionsWrapper = styled(Box)`
  border-right: 1px solid ${colors.grayRegular};
`

const SuggestionContainer = ({ children, containerProps, preview }) => {
  return (
    <AutosuggestWrapper
      width="100%"
      flexDirection={["column", "row"]}
      {...containerProps}
    >
      <ResultsWrapper
        width={[
          "100%",
          "calc(100% + 250px)",
          "calc(100% + 250px)",
          "calc(100% + 450px)",
        ]}
        mt={0.5}
      >
        <SuggestionsWrapper
          width={[
            "100%",
            "calc(100% - 250px)",
            "calc(100% - 250px)",
            "calc(100% - 450px)",
          ]}
        >
          <Flex flexDirection="column" width="100%">
            {children}
          </Flex>
        </SuggestionsWrapper>
        <Box width={["0px", "240px", "240px", "450px"]} pl={[0, 3]} py={[0, 2]}>
          {preview}
        </Box>
      </ResultsWrapper>
    </AutosuggestWrapper>
  )
}

export class SearchBar extends Component<Props, State> {
  public input: HTMLInputElement

  state = {
    term: "",
    entityID: null,
    entityType: null,
    focused: false,
  }

  // Throttled method to toggle previews.
  throttledOnSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return

    const {
      node: { searchableType: entityType, id: entityID },
    } = suggestion

    if (entityType === "FirstItem") return

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
        if (error) logger.error(error)
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

  searchTextChanged = (_e, { newValue: term }) => {
    this.setState({ term })
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onBlur = () => {
    this.setState({ focused: false })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ term: "", entityID: null, entityType: null })
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
    window.location.assign(href)
  }

  renderPreview() {
    const { entityID, entityType, focused } = this.state
    if (!focused) return

    return <SearchPreview entityID={entityID} entityType={entityType} />
  }

  renderSuggestionsContainer = (
    { containerProps, children, query },
    { xs }
  ) => {
    const { focused } = this.state
    if (!focused) {
      return null
    }

    let emptyState = null
    if (!xs && !query && focused) {
      emptyState = (
        <SuggestionItemContainer>{PLACEHOLDER}</SuggestionItemContainer>
      )
    }

    const props = {
      children,
      containerProps,
      focused,
      query,
      preview: this.renderPreview(),
    }

    return (
      <SuggestionContainer {...props}>
        {emptyState || children}
      </SuggestionContainer>
    )
  }

  getSuggestionValue = ({ node: { displayLabel } }) => {
    return displayLabel
  }

  renderSuggestion = (
    { node: { displayLabel, searchableType, href } },
    { query, isHighlighted }
  ) => {
    return (
      <Box bg={isHighlighted ? "#ddd" : "#fff"}>
        <SuggestionItem
          query={query}
          display={displayLabel}
          label={searchableType}
          href={href}
        />
      </Box>
    )
  }

  renderInputComponent = inputProps => {
    return <Input style={{ width: "100%" }} {...inputProps} />
  }

  renderAutosuggestComponent({ xs }) {
    const { term } = this.state
    const { viewer } = this.props

    const inputProps = {
      onChange: this.searchTextChanged,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      placeholder: xs ? "" : PLACEHOLDER,
      value: term,
    }

    const firstSuggestionPlaceholder = {
      node: {
        searchableType: "FirstItem",
        displayLabel: term,
        href: `/search?q=${term}`,
      },
    }

    const edges = get(viewer, v => v.search.edges, [])
    const suggestions = xs ? edges : [firstSuggestionPlaceholder, ...edges]
    return (
      <AutosuggestContainer>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionHighlighted={this.throttledOnSuggestionHighlighted}
          onSuggestionsFetchRequested={this.throttledFetch}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={props => {
            return this.renderSuggestionsContainer(props, { xs })
          }}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          renderInputComponent={this.renderInputComponent}
        />
      </AutosuggestContainer>
    )
  }

  render() {
    return (
      <>
        <Media at="xs">{this.renderAutosuggestComponent({ xs: true })}</Media>
        <Media greaterThan="xs">
          {this.renderAutosuggestComponent({ xs: false })}
        </Media>
      </>
    )
  }
}

export const SearchBarRefetchContainer = createRefetchContainer(
  SearchBar,
  {
    viewer: graphql`
      fragment SearchBar_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
        ) {
        search(query: $term, mode: AUTOSUGGEST, first: 5)
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
    query SearchBarRefetchQuery($term: String!, $hasTerm: Boolean!) {
      viewer {
        ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
      }
    }
  `
)

export const SearchBarQueryRenderer: React.SFC = () => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<SearchBarSuggestQuery>
            environment={relayEnvironment}
            query={graphql`
              query SearchBarSuggestQuery($term: String!, $hasTerm: Boolean!) {
                viewer {
                  ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
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
                return <Input placeholder={PLACEHOLDER} />
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
