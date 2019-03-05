import React, { useState } from "react"
import styled from "styled-components"

import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"

import { MoreNavMenu } from "./Menus/MoreNavMenu"
import { NotificationMenu } from "./Menus/NotificationMenu"
import { NavItem } from "./NavItem"

import {
  ArtsyMarkIcon,
  BellIcon,
  Box,
  Button,
  color,
  Flex,
  Menu,
  MenuItem,
  MoreIcon,
  Separator,
  SoloIcon,
  Spacer,
} from "@artsy/palette"
import { UserMenu } from "./Menus"

export const NavBar: React.FC = () => {
  const [isLoggedIn, toggleLogin] = useState(false)
  const showMobileMenu = false

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
          <NavItem Menu={MoreNavMenu}>
            <MoreIcon top="3px" />
          </NavItem>

          <Spacer mr={3} />

          {isLoggedIn && (
            <>
              <NavItem Menu={NotificationMenu}>
                <BellIcon />
              </NavItem>
              <NavItem Menu={UserMenu}>
                <SoloIcon />
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
                <MenuItem href="/">Artists</MenuItem>
                <MenuItem href="/">Shows</MenuItem>
                <MenuItem href="/">Galleries</MenuItem>
                <MenuItem href="/">Museums</MenuItem>
                <MenuItem href="/">Articles</MenuItem>
                <MenuItem href="/">Fairs</MenuItem>
                <MenuItem href="/">Auctions</MenuItem>

                <Separator />

                <MenuItem href="/">Works for you</MenuItem>
                <MenuItem href="/">Account</MenuItem>
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
  border: 1px solid ${color("black10")};
`
