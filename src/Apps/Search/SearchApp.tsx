import { Col, Row, Separator, Spacer } from "@artsy/palette"
import { SearchApp_viewer } from "__generated__/SearchApp_viewer.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Components/v2"

export interface ArtistAppProps {
  viewer: SearchApp_viewer
}

export class SearchApp extends React.Component<ArtistAppProps> {
  render() {
    const { viewer } = this.props

    return (
      <AppContainer>
        <HorizontalPadding>
          <Row>
            <Col>Search Header</Col>
          </Row>

          <Spacer mb={3} />

          <Row>
            <Col>
              {viewer.search.totalCount} results
              <Spacer mb={3} />
              Search Tabs
              <Spacer mb={3} />
              Search Content to be handled by tabs/sub pages
            </Col>
          </Row>

          {typeof window !== "undefined" && (
            <LazyLoadComponent threshold={1000}>
              <Row>
                <Col>
                  <RecentlyViewed />
                </Col>
              </Row>
            </LazyLoadComponent>
          )}

          <Separator mt={6} mb={3} />

          <Row>
            <Col>
              <Footer />
            </Col>
          </Row>
        </HorizontalPadding>
      </AppContainer>
    )
  }
}

export const SearchAppFragmentContainer = createFragmentContainer(SearchApp, {
  viewer: graphql`
    fragment SearchApp_viewer on Viewer
      @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
      search(query: $term, mode: AUTOSUGGEST, first: 1) {
        totalCount
        edges {
          node {
            ... on SearchableItem {
              id
            }
          }
        }
      }
    }
  `,
})
