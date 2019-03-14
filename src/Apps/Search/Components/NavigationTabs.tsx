import { Flex } from "@artsy/palette"
import { NavigationTabs_searchableConnection } from "__generated__/NavigationTabs_searchableConnection.graphql"
import { RouteTab, RouteTabs } from "Components/v2"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

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

    const artistAggregation = this.aggregationFor("artist")
    const artworkAggregation = this.aggregationFor("artwork")
    const collectionAggregation = this.aggregationFor("marketing_collection")
    const showAggregation = this.aggregationFor("partner_show")
    return (
      <>
        {this.renderTab(`Artworks ${artworkAggregation.count}`, route(""), {
          exact: true,
        })}
        {this.renderTab(
          `Artists ${artistAggregation.count}`,
          route("/artists")
        )}
        {this.renderTab(
          `Collections ${collectionAggregation.count}`,
          route("/collections")
        )}
        {this.renderTab(`Shows ${showAggregation.count}`, route("/shows"))}
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
