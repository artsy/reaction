import { Flex, Sans } from "@artsy/palette"
import { NavigationTabs_searchableConnection } from "__generated__/NavigationTabs_searchableConnection.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { RouteTab, RouteTabs } from "Components/v2"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

interface Props {
  searchableConnection: NavigationTabs_searchableConnection
  term: string
  artworkCount: number
}

const MORE_TABS = [
  "tag",
  "city",
  "fair",
  "feature",
  "PartnerInstitution",
  "PartnerInstitutionalSeller",
]

@track({
  context_module: Schema.ContextModule.NavigationTabs,
})
export class NavigationTabs extends React.Component<Props> {
  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionType.Click,
    subject: tab,
    destination_path,
  }))
  trackClick(tab: string, destination_path: string) {
    // no-op
  }

  renderTab = (
    text: string,
    to: string,
    options: {
      exact?: boolean
      count?: number
    } = {}
  ) => {
    const { exact, count } = options
    const tabName = text.replace(/[0-9]/g, "").trim()
    return (
      <RouteTab
        to={to}
        exact={exact}
        onClick={() => {
          this.trackClick(tabName, to)
        }}
      >
        <Flex>
          {text}
          {count != null && (
            <Sans ml={0.5} size="3t" weight="regular">
              {count}
            </Sans>
          )}
        </Flex>
      </RouteTab>
    )
  }

  aggregationFor(type: string) {
    const { searchableConnection } = this.props
    const { aggregations } = searchableConnection

    const typeAggregation = aggregations.find(agg => agg.slice === "TYPE")
      .counts

    return typeAggregation.find(agg => agg.name === type)
  }

  renderTabs() {
    const { term, artworkCount } = this.props

    const route = tab => `/search${tab}?term=${term}`

    const artistAggregationCount = get(
      this.aggregationFor("artist"),
      agg => agg.count,
      0
    )
    const collectionAggregationCount = get(
      this.aggregationFor("marketing_collection"),
      agg => agg.count,
      0
    )
    const galleryAggregationCount = get(
      this.aggregationFor("PartnerGallery"),
      agg => agg.count,
      0
    )
    const showAggregationCount = get(
      this.aggregationFor("partner_show"),
      agg => agg.count,
      0
    )
    const categoriesAggregationCount = get(
      this.aggregationFor("gene"),
      agg => agg.count,
      0
    )
    const articlesAggregationCount = get(
      this.aggregationFor("article"),
      agg => agg.count,
      0
    )
    const auctionsAggregationCount = get(
      this.aggregationFor("sale"),
      agg => agg.count,
      0
    )

    let restAggregationCount: number = 0
    MORE_TABS.forEach(
      key =>
        (restAggregationCount += get(
          this.aggregationFor(key),
          agg => agg.count,
          0
        ))
    )

    return (
      <>
        {this.renderTab("Artworks", route(""), {
          exact: true,
          count: artworkCount,
        })}
        {this.renderTab("Artists", route("/artists"), {
          count: artistAggregationCount,
        })}
        {this.renderTab("Collections", route("/collections"), {
          count: collectionAggregationCount,
        })}
        {this.renderTab("Galleries", route("/galleries"), {
          count: galleryAggregationCount,
        })}
        {this.renderTab("Shows", route("/shows"), {
          count: showAggregationCount,
        })}
        {this.renderTab("Categories", route("/categories"), {
          count: categoriesAggregationCount,
        })}
        {this.renderTab("Articles", route("/articles"), {
          count: articlesAggregationCount,
        })}
        {this.renderTab("Auctions", route("/auctions"), {
          count: auctionsAggregationCount,
        })}
        {this.renderTab("More", route("/more"), {
          count: restAggregationCount,
        })}
      </>
    )
  }

  render() {
    return (
      <>
        <Flex mx={[-2, 0]}>
          <RouteTabs>{this.renderTabs()}</RouteTabs>
        </Flex>
      </>
    )
  }
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  graphql`
    fragment NavigationTabs_searchableConnection on SearchableConnection {
      aggregations {
        slice
        counts {
          count
          name
        }
      }
    }
  `
)
