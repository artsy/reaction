import { color, Sans, space } from "@artsy/palette"
import { PreloadLink, PreloadLinkProps } from "Artsy/Router"
import React from "react"
import styled from "styled-components"
import { styles, TabsContainer } from "./Tabs"

export const RouteTabs = styled(TabsContainer)`
  a {
    ${styles.tabContainer};
    :not(:last-child) {
      margin-right: ${space(3)}px;
    }
    color: ${color("black30")};
    text-decoration: none;

    &.active {
      color: ${color("black100")};
      ${styles.activeTabContainer};
    }
  }
`

export const RouteTab: React.SFC<Partial<PreloadLinkProps>> = ({
  children,
  ...props
}) => {
  return (
    <PreloadLink {...props}>
      <Sans size="3t" weight="medium">
        {children}
      </Sans>
    </PreloadLink>
  )
}

RouteTabs.displayName = "RouteTabs"
RouteTab.displayName = "RouteTab"
