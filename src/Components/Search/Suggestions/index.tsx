import { SuggestionsSearch_viewer } from "__generated__/SuggestionsSearch_viewer.graphql"
import { SuggestionsSearchQuery } from "__generated__/SuggestionsSearchQuery.graphql"
import { ContextConsumer } from "Artsy/SystemContext"
import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"

interface Props {
  term: string
  viewer: SuggestionsSearch_viewer
}

export const SearchSuggestions: React.SFC<Props> = ({ viewer }) => {
  const edges = get(viewer, v => v.search.edges)
  if (edges.length > 0) {
    return (
      <>
        <h1>Suggestions</h1>
        {edges.map(({ node }) => {
          return <div>{node.displayLabel}</div>
        })}
      </>
    )
  }
  return <>no suggestions</>
}

export const SearchSuggestionsFragmentContainer = createFragmentContainer(
  SearchSuggestions,
  graphql`
    fragment SuggestionsSearch_viewer on Viewer
      @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
      search(query: $term, mode: AUTOSUGGEST, first: 10) {
        edges {
          node {
            displayLabel
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
