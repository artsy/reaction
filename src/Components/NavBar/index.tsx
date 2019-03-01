import React, { useReducer, useState } from "react"
import styled from "styled-components"

import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"

import {
  ArtsyMarkIcon,
  BellIcon,
  BorderBox,
  Box,
  BoxProps,
  Button,
  color,
  Flex,
  HeartIcon,
  Link,
  MoreIcon,
  PowerIcon,
  Sans,
  Separator,
  SettingsIcon,
  SoloIcon,
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

interface MenuProps {
  title?: string
  children?: any // TODO: type as MenuItem[]
}

const Menu: React.SFC<MenuProps> = ({ title, children, ...props }) => {
  return (
    <MenuContainer mt={2} width={230} {...props}>
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

          <Box py={title ? 0 : 1}>{children}</Box>
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

const NotificationMenu = () => {
  return (
    <Menu title="Actvity">
      <MenuItem>
        <Flex alignItems="center">
          <Box width={40} height={40} bg="black5" mr={2} />
          <Box>
            <Sans size="2">5 works added</Sans>
            <Sans size="2" weight="medium">
              Jeff Koons
            </Sans>
          </Box>
        </Flex>
      </MenuItem>
      <MenuItem>
        <Flex alignItems="center">
          <Box width={40} height={40} bg="black5" mr={2} />
          <Box>
            <Sans size="2">5 works added</Sans>
            <Sans size="2" weight="medium">
              Josef Albers
            </Sans>
          </Box>
        </Flex>
      </MenuItem>
      <MenuItem>
        <Flex alignItems="center">
          <Box width={40} height={40} bg="black5" mr={2} />
          <Box>
            <Sans size="2">5 works added</Sans>
            <Sans size="2" weight="medium">
              Ellsworth Kelly
            </Sans>
          </Box>
        </Flex>
      </MenuItem>
      <Flex p={2} flexDirection="column" alignItems="center">
        <Separator />
        <Box pt={2}>
          <Sans size="2">
            <Link href="/" style={{ textDecoration: "underline" }}>
              View all
            </Link>
          </Sans>
        </Box>
      </Flex>
    </Menu>
  )
}

const UserMenu = () => {
  return (
    <Menu>
      <MenuItem>
        <HeartIcon top={5} mr={0.5} /> Saves & Follows
      </MenuItem>
      <MenuItem>
        <SoloIcon top={4} mr={0.5} /> Collector Profile
      </MenuItem>
      <MenuItem>
        <SettingsIcon top={5} mr={0.5} /> Settings
      </MenuItem>
      <MenuItem>
        <PowerIcon top={5} mr={0.5} /> Log out
      </MenuItem>
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
    <Box
      p={1}
      display={display}
      position="relative"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
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
  TOGGLE_MOBILE_MENU,
  TOGGLE_LOG_IN,
}

const navReducer = (state, action) => {
  const resetMenus = {
    showNavMenu: false,
    showUserMenu: false,
    showNotificationsMenu: false,
    showMobileMenu: false,
  }

  switch (action.type) {
    case navActions.TOGGLE_NAV_MENU:
      return {
        ...state,
        ...resetMenus,
        showNavMenu: !state.showNavMenu,
      }
    case navActions.TOGGLE_USER_MENU:
      return {
        ...state,
        ...resetMenus,
        showUserMenu: !state.showUserMenu,
      }
    case navActions.TOGGLE_NOTIFICATIONS_MENU:
      return {
        ...state,
        ...resetMenus,
        showNotificationsMenu: !state.showNotificationsMenu,
      }
    case navActions.TOGGLE_MOBILE_MENU:
      return {
        ...state,
        ...resetMenus,
        showMobileMenu: !state.showMobileMenu,
      }
    case navActions.TOGGLE_LOG_IN:
      return {
        ...state,
        loggedIn: !state.loggedIn,
      }
    default:
      return state
  }
}

export const NavBar = () => {
  const [navState, dispatch] = useReducer(navReducer, {
    showNavMenu: false,
    showUserMenu: false,
    showNotificationsMenu: false,
    showMobileMenu: false,
    loggedIn: false,
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

          <Spacer mr={3} />

          {navState.loggedIn && (
            <>
              <NavItem
                menu={navState.showNavMenu && <NavMenu />}
                onClick={() =>
                  dispatch({
                    type: navActions.TOGGLE_NAV_MENU,
                  })
                }
              >
                <MoreIcon top="3px" />
              </NavItem>
              <NavItem
                menu={navState.showNotificationsMenu && <NotificationMenu />}
                onClick={() =>
                  dispatch({
                    type: navActions.TOGGLE_NOTIFICATIONS_MENU,
                  })
                }
              >
                <BellIcon />
              </NavItem>
              <NavItem
                menu={navState.showUserMenu && <UserMenu />}
                onClick={() =>
                  dispatch({
                    type: navActions.TOGGLE_USER_MENU,
                  })
                }
              >
                <SoloIcon />
              </NavItem>
            </>
          )}
        </NavSection>

        {!navState.loggedIn && (
          <NavSection>
            <Button
              variant="secondaryOutline"
              onClick={() =>
                dispatch({
                  type: navActions.TOGGLE_LOG_IN,
                })
              }
            >
              Log in
            </Button>
            <Spacer mr={1} />
            <Button>Sign up</Button>
          </NavSection>
        )}
      </NavSection>

      {/*
        Mobile
      */}
      <NavSection display={["flex", "none"]}>
        <NavItem
          onClick={() =>
            dispatch({
              type: navActions.TOGGLE_MOBILE_MENU,
            })
          }
        >
          Icon
          {navState.showMobileMenu && (
            <Flex flexDirection="column">
              <Menu>
                <MenuItem>Home</MenuItem>
                <MenuItem>Artists</MenuItem>
                <MenuItem>Shows</MenuItem>
                <MenuItem>Galleries</MenuItem>
                <MenuItem>Museums</MenuItem>
                <MenuItem>Articles</MenuItem>
                <MenuItem>Fairs</MenuItem>
                <MenuItem>Auctions</MenuItem>
                <Separator />
                <MenuItem>Works for you</MenuItem>
                <MenuItem>Account</MenuItem>
              </Menu>
            </Flex>
          )}
        </NavItem>
      </NavSection>
    </Container>
  )
}

const Container = styled(Flex)`
  border: 1px solid ${color("black10")};
`
