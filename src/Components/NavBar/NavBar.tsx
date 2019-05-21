import cookie from "cookies-js"
import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import {
  ArtsyMarkIcon,
  BellIcon,
  Box,
  Button,
  color,
  Flex,
  Link,
  SoloIcon,
  Spacer,
  themeProps,
} from "@artsy/palette"

import { SystemContext } from "Artsy/SystemContext"
import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"

import {
  MobileNavMenu,
  MobileToggleIcon,
  MoreNavMenu,
  NotificationsMenu,
  UserMenu,
} from "./Menus"

import { NavItem } from "./NavItem"
import { NotificationsBadge } from "./NotificationsBadge"
import * as authentication from "./Utils/authentication"

import { AnalyticsSchema } from "Artsy"
import { track, useTracking } from "Artsy/Analytics"
import { useMedia } from "Utils/Hooks/useMedia"

export const NavBar: React.FC = track({
  flow: AnalyticsSchema.Flow.Header,
  context_module: AnalyticsSchema.ContextModule.Header,
})(_props => {
  const { trackEvent } = useTracking()
  const { mediator, user } = useContext(SystemContext)
  const [showMobileMenu, toggleMobileNav] = useState(false)
  const isMobile = useMedia(themeProps.mediaQueries.sm)
  const isLoggedIn = Boolean(user)

  // Close mobile menu if dragging window from small size to desktop
  useEffect(() => {
    if (!isMobile) {
      toggleMobileNav(false)
    }
  }, [isMobile])

  return (
    <>
      <NavBarContainer px={1}>
        <NavSection>
          <Link href="/" style={{ display: "flex" }}>
            <ArtsyMarkIcon height={40} width={40} />
          </Link>
        </NavSection>

        <Spacer mr={1} />

        <NavSection width="100%">
          <Box width="100%">
            <SearchBar />
          </Box>
        </NavSection>

        <Spacer mr={3} />

        {/*
          Desktop. Collapses into mobile at `sm` breakpoint.
        */}
        <NavSection display={["none", "none", "flex"]}>
          <NavSection>
            <NavItem href="/collect">Artworks</NavItem>
            <NavItem href="/auctions">Auctions</NavItem>
            <NavItem href="/galleries">Galleries</NavItem>

            {/**
              Only show Fairs at `xlg`
            */}
            <NavItem
              href="/art-fairs"
              display={["none", "none", "none", "none", "block"]}
            >
              Fairs
            </NavItem>
            <NavItem href="/articles">Magazine</NavItem>
            <NavItem
              Menu={() => {
                return (
                  <Box mr={-2}>
                    <MoreNavMenu />
                  </Box>
                )
              }}
            >
              More
            </NavItem>
          </NavSection>

          <Spacer mr={3} />

          <NavSection>
            {isLoggedIn && (
              <>
                <NavItem
                  href="/works-for-you"
                  Menu={NotificationsMenu}
                  Overlay={NotificationsBadge}
                  onClick={() => {
                    trackEvent({
                      subject: AnalyticsSchema.Subject.NotificationBell,
                      new_notification_count: cookie.get("notification-count"),
                      destination_path: "/works-for-you",
                    })
                  }}
                >
                  {({ hover }) => {
                    return (
                      <BellIcon
                        top={3}
                        fill={hover ? "purple100" : "black80"}
                      />
                    )
                  }}
                </NavItem>
                <NavItem Menu={UserMenu}>
                  {({ hover }) => {
                    return (
                      <SoloIcon
                        top={3}
                        fill={hover ? "purple100" : "black80"}
                      />
                    )
                  }}
                </NavItem>
              </>
            )}
          </NavSection>

          {!isLoggedIn && (
            <NavSection>
              <Button
                variant="secondaryOutline"
                onClick={() => {
                  trackEvent({
                    subject: AnalyticsSchema.Subject.Login,
                  })

                  authentication.login(mediator)
                }}
              >
                Log in
              </Button>
              <Spacer mr={1} />
              <Button
                onClick={() => {
                  trackEvent({
                    subject: AnalyticsSchema.Subject.Signup,
                  })

                  authentication.signup(mediator)
                }}
              >
                Sign up
              </Button>
            </NavSection>
          )}
        </NavSection>

        {/*
          Mobile. Triggers at the `sm` breakpoint.
        */}
        <NavSection display={["flex", "flex", "none"]}>
          <NavItem
            className="mobileHamburgerButton"
            onClick={() => {
              const showMenu = !showMobileMenu
              if (showMenu) {
                trackEvent({
                  subject: AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
                })
              }

              toggleMobileNav(showMenu)
            }}
          >
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

      {showMobileMenu && (
        <>
          <MobileNavCover onClick={() => toggleMobileNav(false)} />
          <MobileNavMenu />
        </>
      )}
    </>
  )
})

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

const NavBarContainer = styled(Flex)`
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
  position: relative;
  z-index: 1;
`

// FIXME: This needs to be cleaned up once we get proper icons
const MobileNavDivider = styled(Box)`
  border-left: 1px solid ${color("black10")};
  height: 63px;
  position: absolute;
  left: -12px;
`

const MobileNavCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(194, 194, 194, 0.3);
  z-index: 0;
`
