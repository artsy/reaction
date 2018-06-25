import { Sans } from "@artsy/palette"
import React from "react"
import { PreloadLink } from "Router/PreloadLink"
import styled from "styled-components"
import { themeGet } from "styled-system"
import { Flex } from "Styleguide/Elements/Flex"
import { styles } from "./Tabs"

export const RouteTabs = styled(Flex)`
  ${styles.tabsContainer};

  a {
    ${styles.tabContainer};
    color: ${themeGet("colors.black30")};
    text-decoration: none;

    &.active {
      color: ${themeGet("colors.black100")};
      ${styles.activeTabContainer};
    }
  }
`

export const RouteTab = ({ children, ...props }) => {
  return (
    <PreloadLink {...props}>
      <Sans size="3t" weight="medium">
        {children}
      </Sans>
    </PreloadLink>
  )
}
