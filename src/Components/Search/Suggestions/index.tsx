import { Box, Flex } from "@artsy/palette"
import { SuggestionsSearch_viewer } from "__generated__/SuggestionsSearch_viewer.graphql"
import { SuggestionsSearchQuery } from "__generated__/SuggestionsSearchQuery.graphql"
import { ContextConsumer } from "Artsy/SystemContext"
import { SearchPreview } from "Components/Search/Previews"
import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"

interface Props {
  term: string
  viewer: SuggestionsSearch_viewer
}

interface State {
  selectedType: string
  selectedID: string
}

export class SearchSuggestions extends React.Component<Props, State> {
  state = {
    selectedType: null,
    selectedID: null,
  }

  renderPreview() {
    const { selectedID, selectedType } = this.state
    if (selectedID && selectedType) {
      return <SearchPreview entityID={selectedID} entityType={selectedType} />
    }
  }

  render() {
    const { viewer } = this.props
    const edges = get(viewer, v => v.search.edges)
    if (edges.length > 0) {
      return (
        <>
          <Flex flexDirection={["column", "row"]}>
            <Box width={["100%", "25%"]}>
              <Flex flexDirection="column">
                {edges.map(
                  ({ node: { displayLabel, searchableType, href } }) => {
                    return (
                      <Box
                        onClick={() => {
                          // TODO: Expose `id` from `SearchableItem`
                          const id = href.replace(/\/.*\//, "")
                          this.setState({
                            selectedType: searchableType,
                            selectedID: id,
                          })
                        }}
                      >
                        {displayLabel}
                      </Box>
                    )
                  }
                )}
              </Flex>
            </Box>
            <Box width={["100%", "75%"]}>{this.renderPreview()}</Box>
          </Flex>
        </>
      )
    }
    return <>no suggestions</>
  }
}

export const SearchSuggestionsFragmentContainer = createFragmentContainer(
  SearchSuggestions,
  graphql`
    fragment SuggestionsSearch_viewer on Viewer
      @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
      search(query: $term, mode: AUTOSUGGEST, first: 5) {
        edges {
          node {
            displayLabel
            href
            ... on SearchableItem {
              searchableType
            }
          }
        }
      }
    }
  `
)

export const SearchSuggestionsQueryRenderer: React.SFC<{
  term: string
}> = ({ term }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<SuggestionsSearchQuery>
            environment={relayEnvironment}
            query={graphql`
              query SuggestionsSearchQuery($term: String!) {
                viewer {
                  ...SuggestionsSearch_viewer @arguments(term: $term)
                }
              }
            `}
            variables={{ term }}
            render={({ error, props }) => {
              if (props) {
                return (
                  <SearchSuggestionsFragmentContainer
                    viewer={props.viewer}
                    term={term}
                  />
                )
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
