import { Spacer, Spinner } from "@artsy/palette"
import { SearchBarQuery } from "__generated__/SearchBarQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import Input from "Components/Input"
import { SearchSuggestionsFragmentContainer as SearchSuggestions } from "Components/Search/Suggestions"
import { throttle } from "lodash"
import React, { Component } from "react"
import { graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"

export interface Props extends ContextProps {
  term?: string
}

interface State {
  term: string
  input: string
  searched: boolean
}

export class SearchBar extends Component<Props, State> {
  state = {
    searched: false,
    term: null,
    input: null,
  }

  throttledTextChange = term => {
    this.setState({ term })
  }

  componentDidMount() {
    this.throttledTextChange = throttle(this.throttledTextChange, 500, {
      leading: true,
    })
  }

  searchTextChanged = e => {
    const input = e.target.value
    this.setState({ input })
    this.throttledTextChange(input)
  }

  resultsForTerm(term: string) {
    if (term && term.length > 0) {
      return (
        <ContextConsumer>
          {({ relayEnvironment }) => {
            return (
              <QueryRenderer<SearchBarQuery>
                environment={relayEnvironment}
                query={graphql`
                  query SearchBarQuery($term: String!) {
                    viewer {
                      ...SuggestionsSearch_viewer @arguments(term: $term)
                    }
                  }
                `}
                variables={{ term }}
                render={({ props }) => {
                  if (props) {
                    return (
                      <SearchSuggestions term={term} viewer={props.viewer} />
                    )
                  } else {
                    return (
                      <SpinnerContainer>
                        <Spinner />
                      </SpinnerContainer>
                    )
                  }
                }}
              />
            )
          }}
        </ContextConsumer>
      )
    }
  }

  render() {
    const { term } = this.state

    return (
      <>
        <Input
          block
          onInput={this.searchTextChanged.bind(this)}
          onPaste={this.searchTextChanged.bind(this)}
          onCut={this.searchTextChanged.bind(this)}
          autoFocus
        />
        <Spacer />
        {this.resultsForTerm(term)}
      </>
    )
  }
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
