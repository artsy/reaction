import { Flex } from "@artsy/palette"
import { NavigationTabs_artist } from "__generated__/NavigationTabs_artist.graphql"
import { SystemContextProps, withSystemContext } from "Artsy"
import { track, trackPageView } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { RouteTab, RouteTabs } from "Components/v2/RouteTabs"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Props extends SystemContextProps {
  artist: NavigationTabs_artist
}

@track({
  context_module: Schema.ContextModule.NavigationTabs,
})
export class NavigationTabs extends React.Component<Props> {
  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionType.Click,
    subject: tab,
    destination_path,
  }))
  handleClick(tab: string, destination_path: string) {
    trackPageView({ path: destination_path })
  }

  renderTab(
    text: string,
    to: string,
    options: {
      exact?: boolean
    } = {}
  ) {
    const { exact } = options

    return (
      <RouteTab
        to={to}
        exact={exact}
        onClick={() => {
          this.handleClick(text, to)
        }}
      >
        {text}
      </RouteTab>
    )
  }

  renderTabs() {
    const {
      artist: { slug, statuses },
    } = this.props

    const route = path => `/artist/${slug}${path}`

    return (
      <>
        {this.renderTab("Overview", route(""), {
          exact: true,
        })}
        {statuses.cv && this.renderTab("CV", route("/cv"))}
        {statuses.articles && this.renderTab("Articles", route("/articles"))}
        {statuses.shows && this.renderTab("Shows", route("/shows"))}
        {statuses.auction_lots &&
          this.renderTab("Auction results", route("/auction-results"))}
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
  withSystemContext(NavigationTabs),
  {
    artist: graphql`
      fragment NavigationTabs_artist on Artist {
        slug
        statuses {
          shows
          articles
          cv(minShowCount: 0)
          auction_lots: auctionLots
        }
      }
    `,
  }
)
