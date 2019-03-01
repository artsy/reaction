import { Box, Flex } from "@artsy/palette"
import { SearchBar_viewer } from "__generated__/SearchBar_viewer.graphql"
import { SearchBarSuggestQuery } from "__generated__/SearchBarSuggestQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import colors from "Assets/Colors"
import Input from "Components/Input"
import { SearchPreviewWrapper as SearchPreview } from "Components/Search/Previews"
import {
  EmptySuggestion,
  PLACEHOLDER,
  PLACEHOLDER_XS,
  SuggestionItem,
} from "Components/Search/Suggestions/SuggestionItem"
import { throttle } from "lodash"
import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import request from "superagent"
import { Provider, Subscribe } from "unstated"
import Events from "Utils/Events"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import {
  AutosuggestManager,
  handlePreviewSelection,
  shouldNavigateToPreview,
} from "./AutosuggestManager"
import { SearchInputContainer } from "./SearchInputContainer"
import { SearchBarState } from "./state"

const logger = createLogger("Components/Search/SearchBar")

export interface Props extends ContextProps {
  relay: RelayRefetchProp
  viewer: SearchBar_viewer
  searchState: SearchBarState
}

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
        <Box width={["0px", "240px", "240px", "450px"]} px={[0, 2]} py={[0, 2]}>
          {preview}
        </Box>
      </ResultsWrapper>
    </AutosuggestWrapper>
  )
}

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class SearchBar extends Component<Props, State> {
  public input: HTMLInputElement
  private containerRef: Node
  private userClickedOnDescendant: boolean

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

    this.setState({
      entityType,
      entityID,
    })
  }

  @track((_props, _state, [query, hasResults]) => ({
    action_type: hasResults
      ? Schema.ActionType.SearchedAutosuggestWithResults
      : Schema.ActionType.SearchedAutosuggestWithoutResults,
    query,
  }))
  trackSearch(_term, _hasResults) {
    /* no-op */
  }

  // Throttled method to perform refetch for new suggest query.
  throttledFetch = ({ value: term }) => {
    const { relay, viewer } = this.props
    const performanceStart = performance && performance.now()

    relay.refetch(
      {
        term,
        hasTerm: true,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
          return
        } else if (performanceStart && sd.VOLLEY_ENDPOINT) {
          this.reportPerformanceMeasurement(performanceStart)
        }
        const edges = get(viewer, v => v.search.edges, [])
        this.trackSearch(term, edges.length > 0)
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

  reportPerformanceMeasurement = performanceStart => {
    const duration = performance.now() - performanceStart
    const deviceType = sd.IS_MOBILE ? "mobile" : "desktop"

    const metricPayload = {
      type: "timing",
      name: "autocomplete-search-response",
      timing: duration,
      tags: [`device-type:${deviceType}`, "design:rich"],
    }

    request
      .post(sd.VOLLEY_ENDPOINT)
      .send({
        serviceName: "force",
        metrics: [metricPayload],
      })
      .end()
  }

  searchTextChanged = (_e, { newValue: term }) => {
    this.setState({ term })
  }

  @track({
    action_type: Schema.ActionType.FocusedOnAutosuggestInput,
  })
  onFocus() {
    this.setState({ focused: true })
  }

  onBlur = e => {
    // This event _also_ fires when a user clicks on a link in the preview pane.
    //  If we setState({focused: false}) when that happens, the link will get
    //  removed from the DOM before the browser has a chance to follow it.
    if (this.containerRef.contains(e.relatedTarget)) {
      this.userClickedOnDescendant = true
    } else {
      this.setState({ focused: false })
    }
  }

  onSuggestionsClearRequested = () => {
    // This event _also_ fires when a user clicks on a link in the preview pane.
    //  If we initialize state when that happens, the link will get removed
    //  from the DOM before the browser has a chance to follow it.
    if (!this.userClickedOnDescendant) {
      this.setState({ term: "", entityID: null, entityType: null })
    }
  }

  // Navigate to selected search item.
  @track(
    (
      _props,
      state: State,
      [
        {
          suggestion: {
            node: { href, searchableType, id },
          },
          suggestionIndex,
        },
      ]
    ) => ({
      action_type: Schema.ActionType.SelectedItemFromSearch,
      query: state.term,
      destination_path: href,
      item_type: searchableType,
      item_id: id,
      item_number: suggestionIndex,
    })
  )
  onSuggestionSelected({
    suggestion: {
      node: { href },
    },
  }) {
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

    const showEmptySuggestion = !xs && !query && focused

    const props = {
      children,
      containerProps,
      focused,
      query,
      preview: this.renderPreview(),
    }

    return (
      <SuggestionContainer {...props}>
        {showEmptySuggestion ? <EmptySuggestion /> : children}
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
      <SuggestionItem
        display={displayLabel}
        href={href}
        isHighlighted={isHighlighted}
        label={searchableType}
        query={query}
      />
    )
  }

  renderInputComponent = props => <SearchInputContainer {...props} />

  renderAutosuggestComponent({ xs }) {
    const { term } = this.state
    const { viewer, searchState } = this.props

    const inputProps = {
      onChange: this.searchTextChanged,
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur,
      placeholder: xs ? PLACEHOLDER_XS : PLACEHOLDER,
      value: term,
      name: "term",
    }

    if (searchState.state.selectedPreviewIndex != null) {
      inputProps["aria-activedescendant"] = `preview-${
        searchState.state.selectedPreviewIndex
      }`
    }

    const firstSuggestionPlaceholder = {
      node: {
        searchableType: "FirstItem",
        displayLabel: term,
        href: `/search?q=${term}`,
      },
    }

    const edges = get(viewer, v => v.search.edges, [])
    const suggestions = [firstSuggestionPlaceholder, ...edges]
    return (
      <AutosuggestManager ref={ref => (this.containerRef = ref)}>
        <Autosuggest
          alwaysRenderSuggestions={searchState.state.hasEnteredPreviews}
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
          onSuggestionSelected={(e, selection) => {
            e.preventDefault()
            if (shouldNavigateToPreview(searchState)) {
              handlePreviewSelection(searchState)
            } else {
              this.onSuggestionSelected(selection)
            }
          }}
          renderInputComponent={this.renderInputComponent}
        />
      </AutosuggestManager>
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
  (props: Props) => {
    return (
      <Subscribe to={[SearchBarState]}>
        {(searchState: SearchBarState) => {
          return <SearchBar {...props} searchState={searchState} />
        }}
      </Subscribe>
    )
  },
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
                return (
                  <Provider>
                    <SearchBarRefetchContainer viewer={props.viewer} />
                  </Provider>
                )
              } else {
                return (
                  <Input
                    name="term"
                    style={{ width: "100%" }}
                    placeholder={PLACEHOLDER_XS}
                  />
                )
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
