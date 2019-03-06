import { Col, Row, Separator, Spacer } from "@artsy/palette"
import { SearchApp_viewer } from "__generated__/SearchApp_viewer.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Search/Components/NavigationTabs"
import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Components/v2"
import { Location } from "found"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtistAppProps {
  viewer: SearchApp_viewer
  location: Location
}

export class SearchApp extends React.Component<ArtistAppProps> {
  render() {
    const { viewer, location } = this.props
    const { search } = viewer
    const {
      query: { term },
    } = location

    return (
      <AppContainer>
        <HorizontalPadding>
          <Row>
            <Col>Search Header</Col>
          </Row>

          <Spacer mb={3} />

          <Row>
            <Col>
              {viewer.search.totalCount} results for "{term}"
              <Spacer mb={3} />
              <NavigationTabs term={term} searchableConnection={search} />
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
      search(query: $term, first: 1, aggregations: [TYPE]) {
        totalCount
        ...NavigationTabs_searchableConnection
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
