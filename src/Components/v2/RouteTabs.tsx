import {
  color,
  Sans,
  sharedTabsStyles,
  space,
  TabsContainer,
} from "@artsy/palette"
import { Link, LinkProps } from "found"
import React from "react"
import styled from "styled-components"

export const RouteTabs = styled(TabsContainer)`
  a {
    ${sharedTabsStyles.tabContainer};

    :not(:last-child) {
      margin-right: ${space(3)}px;
    }
    color: ${color("black30")};
    text-decoration: none;

    &.active {
      color: ${color("black100")};
      ${sharedTabsStyles.activeTabContainer};
    }
  }
`

export const RouteTab: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props} activeClassName="active">
      <Sans size="3t" weight="medium">
        {children}
      </Sans>
    </Link>
  )
}

RouteTabs.displayName = "RouteTabs"
RouteTab.displayName = "RouteTab"
