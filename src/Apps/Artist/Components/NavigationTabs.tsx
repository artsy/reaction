import { NavigationTabs_artist } from "__generated__/NavigationTabs_artist.graphql"
import { track } from "Analytics"
import * as Schema from "Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "Styleguide/Components/RouteTabs"
import { Responsive } from "Utils/Responsive"

interface Props {
  artist: NavigationTabs_artist
}

@track({ context_module: "NavigationTabs" })
export class NavigationTabs extends React.Component<Props> {
  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionType.Click,
    subject: tab,
    destination_path,
  }))
  handleClick(tab: string, destination_path: string) {
    // no-op
  }

  renderTab(text: string, to: string, exact: boolean = false) {
    return (
      <RouteTab
        to={to}
        exact={exact}
        onClick={() => this.handleClick(text, to)}
      >
        {text}
      </RouteTab>
    )
  }

  render() {
    const { id, statuses } = this.props.artist
    const route = path => `/artist/${id}${path}`

    return (
      <Responsive>
        {({ xs }) => {
          return (
            <RouteTabs
              mx={xs ? -4 : 0}
              pl={xs ? 4 : 0}
              style={{ overflow: xs ? "scroll" : "" }}
            >
              {this.renderTab("Overview", route(""), true)}
              {statuses.cv && this.renderTab("CV", route("/cv"))}
              {statuses.articles &&
                this.renderTab("Articles", route("/articles"))}
              {statuses.shows && this.renderTab("Shows", route("/shows"))}
              {statuses.auction_lots &&
                this.renderTab("Auction results", route("/auction-results"))}
              {statuses.artists &&
                this.renderTab("Related artists", route("/related-artists"))}
            </RouteTabs>
          )
        }}
      </Responsive>
    )
  }
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  graphql`
    fragment NavigationTabs_artist on Artist {
      id
      statuses {
        shows
        artists
        articles
        cv(minShowCount: 0)
        auction_lots
      }
    }
  `
)
