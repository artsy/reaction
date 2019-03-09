import React, { useState } from "react"
import styled from "styled-components"

import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"
import { NavItem } from "./NavItem"

import {
  MobileNavMenu,
  MobileToggleIcon, // FIXME: Move this out when we have an icon
  MoreNavMenu,
  NotificationsMenu,
  UserMenu,
} from "./Menus"

import { NotificationsBadge } from "./NotificationsBadge"

import {
  ArtsyMarkIcon,
  BellIcon,
  Box,
  Button,
  color,
  Flex,
  Link,
  MoreIcon,
  SoloIcon,
  Spacer,
} from "@artsy/palette"

export const NavBar: React.FC = () => {
  const [isLoggedIn, toggleLogin] = useState(true)
  const [showMobileMenu, toggleMobileNav] = useState(false)

  return (
    <>
      <NavBarContainer p={1}>
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
            <NavItem href="/articles">Editorial</NavItem>
            <NavItem Menu={MoreNavMenu}>
              <MoreIcon top="3px" />
            </NavItem>

            <Spacer mr={3} />

            {isLoggedIn && (
              <>
                <NavItem Menu={NotificationsMenu} Overlay={NotificationsBadge}>
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
          <NavItem onClick={() => toggleMobileNav(!showMobileMenu)}>
            <Flex
              alignItems="center"
              justifyContent="center"
              width={22}
              height={22}
            >
              <MobileNavDivider />
              <MobileToggleIcon open={showMobileMenu} />
            </Flex>
          </NavItem>
        </NavSection>
      </NavBarContainer>

      {showMobileMenu && <MobileNavMenu />}
    </>
  )
}

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

const NavBarContainer = styled(Flex)`
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
`

// FIXME: This needs to be cleaned up once we get proper icons
const MobileNavDivider = styled(Box)`
  border-left: 1px solid ${color("black10")};
  height: 63px;
  position: absolute;
  left: -12px;
`
