import { Box, Col, Row, Separator, Serif, Spacer } from "@artsy/palette"
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
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { ZeroState } from "./Components/ZeroState"

export interface Props {
  viewer: SearchApp_viewer
  location: Location
}

@track({
  context_page: Schema.PageName.SearchPage,
})
export class SearchApp extends React.Component<Props> {
  renderResults(count: number, artworkCount: number) {
    const { viewer, location } = this.props
    const { search } = viewer
    const {
      query: { term },
    } = location

    return (
      <>
        <Spacer mb={4} />
        <Row>
          <Col>
            <Serif size="5">
              {count.toLocaleString()} Result{count > 1 ? "s" : ""} for "{term}"
            </Serif>
            <Spacer mb={4} />
            <span id="jumpto--searchResultTabs" />
            <NavigationTabs
              artworkCount={artworkCount}
              term={term}
              searchableConnection={search}
            />
            <Box minHeight="30vh">{this.props.children}</Box>
          </Col>
        </Row>

        {this.renderFooter()}
      </>
    )
  }

  renderFooter() {
    return (
      <>
        <Row>
          <Col>
            <RecentlyViewed />
          </Col>
        </Row>

        <Separator mt={6} mb={3} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </>
    )
  }

  render() {
    const { viewer, location } = this.props
    const { search, filter_artworks } = viewer
    const {
      query: { term },
    } = location

    const { aggregations } = search
    const artworkCount = get(filter_artworks, f => f.counts.total, 0)

    let countWithoutArtworks: number = 0
    const typeAggregation = aggregations.find(agg => agg.slice === "TYPE")
      .counts

    typeAggregation.forEach(({ count, name }) => {
      if (name !== "artwork") {
        countWithoutArtworks += count
      }
    })

    const hasResults = !!(countWithoutArtworks || artworkCount)

    return (
      <AppContainer>
        <HorizontalPadding>
          {/* NOTE: react-head automatically moves these tags to the <head> element */}
          <SearchMeta term={term} />
          {hasResults ? (
            this.renderResults(
              countWithoutArtworks + artworkCount,
              artworkCount
            )
          ) : (
            <Box mt={3}>
              <ZeroState entity="results" term={term} />
              {this.renderFooter()}
            </Box>
          )}
          <Spacer mb={3} />
        </HorizontalPadding>
      </AppContainer>
    )
  }
}

export const SearchAppFragmentContainer = createFragmentContainer(SearchApp, {
  viewer: {
    viewer: graphql`
      fragment SearchApp_viewer on Viewer
        @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
        search(query: $term, first: 1, aggregations: [TYPE]) {
          aggregations {
            slice
            counts {
              count
              name
            }
          }
          ...NavigationTabs_searchableConnection
          edges {
            node {
              ... on SearchableItem {
                id
                displayLabel
                displayType
              }
            }
          }
        }

        filter_artworks(keyword: $term, size: 0, aggregations: [TOTAL]) {
          counts {
            total
          }
        }
      }
    `,
  },
})
