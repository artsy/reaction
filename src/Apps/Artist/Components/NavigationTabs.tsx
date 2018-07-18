import { NavigationTabs_artist } from "__generated__/NavigationTabs_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "Styleguide/Components/RouteTabs"

interface Props {
  artist: NavigationTabs_artist
}

export const NavigationTabs: React.SFC<Props> = props => {
  const { statuses } = props.artist
  const route = (path = "") => `/artist2/${props.artist.id}${path}`

  return (
    <RouteTabs>
      <RouteTab to={route()} exact>
        Overview
      </RouteTab>
      {statuses.cv && <RouteTab to={route("/cv")}>CV</RouteTab>}
      {statuses.articles && (
        <RouteTab to={route("/articles")}>Articles</RouteTab>
      )}
      {statuses.shows && <RouteTab to={route("/shows")}>Shows</RouteTab>}
      {statuses.auction_lots && (
        <RouteTab to={route("/auction-results")}>Auction results</RouteTab>
      )}
      {(statuses.artists || statuses.contemporary) && (
        <RouteTab to={route("/related-artists")}>Related artists</RouteTab>
      )}
    </RouteTabs>
  )
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  graphql`
    fragment NavigationTabs_artist on Artist {
      id
      statuses {
        shows
        artists
        contemporary
        articles
        cv(minShowCount: 0)
        auction_lots
      }
    }
  `
)
