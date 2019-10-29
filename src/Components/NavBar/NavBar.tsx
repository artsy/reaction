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
  space,
  Spacer,
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
import Events from "Utils/Events"
import { useMedia } from "Utils/Hooks/useMedia"

export const NavBar: React.FC = track(
  {
    flow: AnalyticsSchema.Flow.Header,
    context_module: AnalyticsSchema.ContextModule.Header,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)(_props => {
  const { trackEvent } = useTracking()
  const { mediator, user } = useContext(SystemContext)
  const [showMobileMenu, toggleMobileNav] = useState(false)
  const { xs, sm } = useMedia()
  const isMobile = xs || sm
  const isLoggedIn = Boolean(user)
  const getNotificationCount = () => cookie.get("notification-count") || 0

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
            <NavItem href="/articles">Editorial</NavItem>
            <NavItem
              Menu={() => {
                return (
                  <Box mr={-150}>
                    <MoreNavMenu width={160} />
                  </Box>
                )
              }}
            >
              More
            </NavItem>
          </NavSection>

          <Spacer mr={2} />

          <NavSection>
            {isLoggedIn && (
              <>
                <NavItem
                  href="/works-for-you"
                  Menu={NotificationsMenu}
                  Overlay={NotificationsBadge}
                  onClick={() => {
                    trackEvent({
                      action_type: AnalyticsSchema.ActionType.Click,
                      subject: AnalyticsSchema.Subject.NotificationBell,
                      new_notification_count: getNotificationCount(),
                      destination_path: "/works-for-you",
                    })
                  }}
                >
                  {({ hover }) => {
                    if (hover) {
                      trackEvent({
                        action_type: AnalyticsSchema.ActionType.Hover,
                        subject: AnalyticsSchema.Subject.NotificationBell,
                        new_notification_count: getNotificationCount(),
                      })
                    }
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
                    if (hover) {
                      trackEvent({
                        action_type: AnalyticsSchema.ActionType.Hover,
                        subject: "User",
                      })
                    }
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
                    action_type: AnalyticsSchema.ActionType.Click,
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
                    action_type: AnalyticsSchema.ActionType.Click,
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
                  action_type: AnalyticsSchema.ActionType.Click,
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

export const NavBarHeight = space(6) - 1 // border offset

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

const NavBarContainer = styled(Flex)`
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
  position: relative;
  z-index: 3;
  height: ${NavBarHeight}px;
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
