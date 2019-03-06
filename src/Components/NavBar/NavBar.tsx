import React, { useState } from "react"
import styled from "styled-components"

import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"
import { NavItem } from "./NavItem"

import {
  MoreNavMenu,
  NotificationsMenuQueryRenderer as NotificationsMenu,
  UserMenu,
} from "./Menus"

import {
  ArtsyMarkIcon,
  BellIcon,
  Box,
  Button,
  color,
  Flex,
  Link,
  Menu,
  MenuItem,
  MoreIcon,
  Separator,
  SoloIcon,
  Spacer,
} from "@artsy/palette"

export const NavBar: React.FC = () => {
  const [isLoggedIn, toggleLogin] = useState(true)
  const showMobileMenu = false

  return (
    <Container p={1}>
      <NavSection>
        <Link href="/" style={{ display: "flex" }}>
          <ArtsyMarkIcon height={40} width={40} />
        </Link>
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
          <NavItem href="/collect">Artworks</NavItem>
          <NavItem href="/auctions">Auctions</NavItem>

          {/**
            Only show Galleries and Fairs at `lg` and `xl`
          */}
          <NavItem href="/galleries" display={["none", "none", "block"]}>
            Galleries
          </NavItem>
          <NavItem
            href="/art-fairs"
            display={["none", "none", "none", "block"]}
          >
            Fairs
          </NavItem>
          <NavItem href="/articles">Magazine</NavItem>
          <NavItem Menu={MoreNavMenu}>
            <MoreIcon top="3px" />
          </NavItem>

          <Spacer mr={3} />

          {isLoggedIn && (
            <>
              <NavItem Menu={NotificationsMenu}>
                <BellIcon top={3} />
              </NavItem>
              <NavItem Menu={UserMenu}>
                <SoloIcon top={3} />
              </NavItem>
            </>
          )}
        </NavSection>

        {!isLoggedIn && (
          <NavSection>
            <Button
              variant="secondaryOutline"
              onClick={() => toggleLogin(true)}
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
        <NavItem>
          Icon
          {showMobileMenu && (
            <Flex flexDirection="column">
              <Menu>
                <MenuItem href="/">Home</MenuItem>
                <MenuItem href="/artworks">Artworks</MenuItem>
                <MenuItem href="/auctions">Auctions</MenuItem>
                <MenuItem href="/articles">Magazine</MenuItem>
                <MenuItem href="/galleries">Galleries</MenuItem>
                <MenuItem href="/fairs">Fairs</MenuItem>
                <MenuItem href="/artists">Artists</MenuItem>
                <MenuItem href="/shows">Shows</MenuItem>
                <MenuItem href="/institutions">Museums</MenuItem>

                <Separator />

                <MenuItem href="/works-for-you">Works for you</MenuItem>
                <MenuItem href="/user/edit">Account</MenuItem>
              </Menu>
            </Flex>
          )}
        </NavItem>
      </NavSection>
    </Container>
  )
}

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

const Container = styled(Flex)`
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
`
