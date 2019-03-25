import { Col, Row, Separator, Serif, Spacer } from "@artsy/palette"
import { SearchApp_viewer } from "__generated__/SearchApp_viewer.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Search/Components/NavigationTabs"
import { SearchMeta } from "Apps/Search/Components/SearchMeta"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Components/v2"
import { Location } from "found"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"

export interface Props {
  viewer: SearchApp_viewer
  location: Location
}

@track({
  context_page: Schema.PageName.SearchPage,
})
export class SearchApp extends React.Component<Props> {
  render() {
    const { viewer, location } = this.props
    const { search } = viewer
    const {
      query: { term },
    } = location

    return (
      <AppContainer>
        <HorizontalPadding>
          {/* NOTE: react-head automatically moves these tags to the <head> element */}
          <SearchMeta term={term} />

          <Spacer mb={3} />

          <Row>
            <Col>
              <Serif size="5">
                {viewer.search.totalCount.toLocaleString()} Results for "{term}"
              </Serif>
              <Spacer mb={3} />
              <span id="jumpto--searchResultTabs" />
              <NavigationTabs term={term} searchableConnection={search} />
              <Spacer mb={3} />
              {this.props.children}
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
              displayLabel
              searchableType
            }
          }
        }
      }
    }
  `,
})
