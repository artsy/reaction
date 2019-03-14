import { Flex } from "@artsy/palette"
import { NavigationTabs_searchableConnection } from "__generated__/NavigationTabs_searchableConnection.graphql"
import { RouteTab, RouteTabs } from "Components/v2"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

interface Props {
  searchableConnection: NavigationTabs_searchableConnection
  term: string
}

export class NavigationTabs extends React.Component<Props> {
  renderTab(
    text: string,
    to: string,
    options: {
      exact?: boolean
    } = {}
  ) {
    const { exact } = options

    return (
      <RouteTab to={to} exact={exact}>
        {text}
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
    const { term } = this.props

    const route = tab => `/search2${tab}?term=${term}`

    const artistAggregationCount = get(
      this.aggregationFor("artist"),
      agg => agg.count,
      0
    )
    const artworkAggregationCount = get(
      this.aggregationFor("artwork"),
      agg => agg.count,
      0
    )
    const collectionAggregationCount = get(
      this.aggregationFor("marketing_collection"),
      agg => agg.count,
      0
    )
    const galleryAggregationCount = get(
      this.aggregationFor("gallery"),
      agg => agg.count,
      0
    )
    const showAggregationCount = get(
      this.aggregationFor("partner_show"),
      agg => agg.count,
      0
    )

    return (
      <>
        {this.renderTab(`Artworks ${artworkAggregationCount}`, route(""), {
          exact: true,
        })}
        {this.renderTab(`Artists ${artistAggregationCount}`, route("/artists"))}
        {this.renderTab(
          `Collections ${collectionAggregationCount}`,
          route("/collections")
        )}
        {this.renderTab(
          `Galleries ${galleryAggregationCount}`,
          route("/galleries")
        )}
        {this.renderTab(`Shows ${showAggregationCount}`, route("/shows"))}
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
