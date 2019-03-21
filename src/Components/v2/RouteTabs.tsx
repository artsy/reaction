import {
  color,
  Sans,
  sharedTabsStyles,
  space,
  TabsContainer,
} from "@artsy/palette"
import { PreloadLink, PreloadLinkProps } from "Artsy/Router"
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

export const RouteTab: React.FC<Partial<PreloadLinkProps>> = ({
  children,
  /**
   * If set to false it will fall back to <Link> (from found) under the hood, and
   * skip all preload behavior. For routes that depend on prepareVariables this
   * is required.
   */
  preload = true,
  ...props
}) => {
  return (
    <PreloadLink {...props} preload={preload}>
      <Sans size="3t" weight="medium">
        {children}
      </Sans>
    </PreloadLink>
  )
}

RouteTabs.displayName = "RouteTabs"
RouteTab.displayName = "RouteTab"
