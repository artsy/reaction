import React, { Reducer, useReducer, useState } from "react"
import styled from "styled-components"

import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"

import {
  ArtsyMarkIcon,
  Box,
  BoxProps,
  Button,
  color,
  Flex,
  Link,
  MoreIcon,
  Sans,
  Spacer,
} from "@artsy/palette"

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

const NavItem: React.SFC<BoxProps> = ({ children, display = "block" }) => {
  return (
    <Box p={1} display={display}>
      <Sans size="3" weight="medium">
        <Link href="/">{children}</Link>
      </Sans>
    </Box>
  )
}

enum navActions {
  TOGGLE_NAV_MENU,
  TOGGLE_USER_MENU,
  TOGGLE_NOTIFICATIONS_MENU,
}

const navReducer = (state, action) => {
  switch (action.type) {
    case navActions.TOGGLE_NAV_MENU:
      return {
        ...state,
        showNavMenu: !state.showNavMenu,
      }
    case navActions.TOGGLE_USER_MENU:
      return {
        ...state,
        showeUserMenu: !state.showeUserMenu,
      }
    case navActions.TOGGLE_NOTIFICATIONS_MENU:
      return {
        ...state,
        showNotificationsMenu: !state.showNotificationsMenu,
      }
  }
}

export const NavBar = () => {
  const [navState, dispatch] = useReducer(navReducer, {
    showNavMenu: false,
    showeUserMenu: false,
    showNotificationsMenu: false,
  })

  console.log(navState)

  return (
    <Container mt={1} p={1}>
      <NavSection>
        <ArtsyMarkIcon height={40} width={40} />
      </NavSection>

      <Spacer mr={1} />

      <NavSection width="100%">
        <Box width="100%" maxWidth={570}>
          <SearchBar />
        </Box>
      </NavSection>

      <Spacer mr={3} />

      {/* Desktop */}
      <NavSection display={["none", "flex"]}>
        <NavSection>
          <NavItem>Artworks</NavItem>
          <NavItem>Auctions</NavItem>
          <NavItem display={["none", "none", "block"]}>Galleries</NavItem>
          <NavItem display={["none", "none", "none", "block"]}>Fairs</NavItem>
          <NavItem>Magazine</NavItem>
          <NavItem>
            <MoreIcon top="3px" />
          </NavItem>
        </NavSection>

        <Spacer mr={3} />

        <NavSection>
          <Button variant="secondaryOutline">Log in</Button>
          <Spacer mr={1} />
          <Button>Sign up</Button>
        </NavSection>
      </NavSection>

      {/* Mobile */}
      <NavSection display={["flex", "none"]}>Click me</NavSection>
    </Container>
  )
}

const Container = styled(Flex)`
  border: 1px solid ${color("black10")};
`
