import React, { useReducer, useState } from "react"
import styled from "styled-components"

import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"

import {
  ArtsyMarkIcon,
  BorderBox,
  Box,
  BoxProps,
  Button,
  color,
  Flex,
  Link,
  MoreIcon,
  Sans,
  Separator,
  Spacer,
} from "@artsy/palette"

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

interface NavItemProps extends BoxProps {
  href?: string
  menu?: any
  onClick?: () => void
}

const MenuItem = ({ children }) => {
  const [hover, toggleHover] = useState(false)

  return (
    <Box
      bg={hover ? "black5" : ""}
      style={{ cursor: "pointer" }}
      onMouseOver={() => toggleHover(true)}
      onMouseOut={() => toggleHover(false)}
    >
      <Box px={2} py={1}>
        <Sans size="2" weight="medium">
          <Link
            href="/"
            style={{
              textDecoration: hover ? "underline" : "none",
            }}
          >
            {children}
          </Link>
        </Sans>
      </Box>
    </Box>
  )
}

const MenuContainer = styled(Box)`
  position: absolute;
  background-color: white;
  transform: translate(-80%);
  box-shadow: 2px 2px ${color("black5")};
`

const Menu = ({ title, children }) => {
  return (
    <MenuContainer mt={2} width={230}>
      <BorderBox p={0}>
        <Flex flexDirection="column" width="100%">
          {title && (
            <Box px={2} py={1}>
              <Sans size="3" weight="medium">
                {title}
              </Sans>
              <Spacer py={0.5} />
              <Separator />
            </Box>
          )}

          {children}
        </Flex>
      </BorderBox>
    </MenuContainer>
  )
}

const NavMenu = () => {
  return (
    <Menu title="More">
      <MenuItem>Artists</MenuItem>
      <MenuItem>Shows</MenuItem>
      <MenuItem>Museums</MenuItem>
      <MenuItem>Artsy for Galleries</MenuItem>
    </Menu>
  )
}

const NavItem: React.SFC<NavItemProps> = ({
  display = "block",
  children,
  href,
  menu,
  onClick,
}) => {
  return (
    <Box p={1} display={display} position="relative" onClick={onClick}>
      <Sans size="3" weight="medium">
        {href ? <Link href="/">{children}</Link> : children}
      </Sans>

      {menu}
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

      {/*
        Desktop
      */}
      <NavSection display={["none", "flex"]}>
        <NavSection>
          <NavItem>Artworks</NavItem>
          <NavItem>Auctions</NavItem>

          {/**
            Only show Galleries and Fairs at `lg` and `xl`
          */}
          <NavItem display={["none", "none", "block"]}>Galleries</NavItem>
          <NavItem display={["none", "none", "none", "block"]}>Fairs</NavItem>
          <NavItem>Magazine</NavItem>
          <NavItem
            menu={navState.showNavMenu && <NavMenu />}
            onClick={() => dispatch({ type: navActions.TOGGLE_NAV_MENU })}
          >
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

      {/*
        Mobile
      */}
      <NavSection display={["flex", "none"]}>Click me</NavSection>
    </Container>
  )
}

const Container = styled(Flex)`
  border: 1px solid ${color("black10")};
`
