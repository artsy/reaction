import { NavigationTabs_artist } from "__generated__/NavigationTabs_artist.graphql"
import { track } from "Analytics"
import * as Schema from "Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppState } from "Router/state"
import { RouteTab, RouteTabs } from "Styleguide/Components/RouteTabs"
import { Subscribe } from "unstated"
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

  renderTab(
    text: string,
    to: string,
    options: {
      exact?: boolean
      mediator: {
        trigger: (action: string, config: object) => void
      }
    }
  ) {
    const { exact, mediator } = options
    return (
      <RouteTab
        to={to}
        exact={exact}
        onClick={() => {
          mediator && mediator.trigger("artist:tabclick", { to })
          this.handleClick(text, to)
        }}
      >
        {text}
      </RouteTab>
    )
  }

  render() {
    const { id, statuses } = this.props.artist
    const route = path => `/artist/${id}${path}`

    return (
      <Subscribe to={[AppState]}>
        {({ state }) => {
          const { mediator } = state

          return (
            <Responsive>
              {({ xs }) => {
                return (
                  <RouteTabs
                    mx={xs ? -4 : 0}
                    pl={xs ? 4 : 0}
                    size={xs ? "xs" : null}
                  >
                    {this.renderTab("Overview", route(""), {
                      exact: true,
                      mediator,
                    })}
                    {statuses.cv &&
                      this.renderTab("CV", route("/cv"), { mediator })}
                    {statuses.articles &&
                      this.renderTab("Articles", route("/articles"), {
                        mediator,
                      })}
                    {statuses.shows &&
                      this.renderTab("Shows", route("/shows"), { mediator })}
                    {statuses.auction_lots &&
                      this.renderTab(
                        "Auction results",
                        route("/auction-results"),
                        { mediator }
                      )}
                    {statuses.artists &&
                      this.renderTab(
                        "Related artists",
                        route("/related-artists"),
                        { mediator }
                      )}
                  </RouteTabs>
                )
              }}
            </Responsive>
          )
        }}
      </Subscribe>
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
