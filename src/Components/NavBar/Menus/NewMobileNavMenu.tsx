import { Box, ChevronIcon, color, Flex, Sans, Separator } from "@artsy/palette"
import { AnalyticsSchema, useSystemContext } from "Artsy"
import { track, useTracking } from "Artsy/Analytics"
import React from "react"
import styled from "styled-components"
import { MenuData, MenuLinkData } from "../menuData"
import { MobileLink } from "./MobileLink"
import {
  NavigatorContextProvider,
  useNavigation,
} from "./NavigatorContextProvider"

interface Props {
  isOpen: boolean
  menuData: MenuData
}

export const NewMobileNavMenu: React.FC<Props> = props => {
  const {
    links: [artworks, artists],
  } = props.menuData

  const { user } = useSystemContext()
  const { trackEvent } = useTracking()

  const handleClickTracking = (href: string, text: string) => {
    trackEvent({
      context_module: AnalyticsSchema.ContextModule.HeaderArtworksDropdown,
      flow: "Header",
      subject: text,
      destination_path: href,
    })
  }

  return (
    <NavigatorContextProvider>
      <MenuViewport>
        <AnimatingMenuWrapper isOpen={props.isOpen}>
          <ul>
            <MobileSubmenuLink menu={(artworks as MenuLinkData).menu}>
              {(artworks as MenuLinkData).menu.title}
            </MobileSubmenuLink>

            <MobileSubmenuLink menu={(artists as MenuLinkData).menu}>
              {(artists as MenuLinkData).menu.title}
            </MobileSubmenuLink>
            <MobileLink
              href="/auctions"
              onClick={() => {
                handleClickTracking("/auctions", "Auctions")
              }}
            >
              Auctions
            </MobileLink>
            <MobileLink
              href="/articles"
              onClick={() => {
                handleClickTracking("/articles", "Editorial")
              }}
            >
              Editorial
            </MobileLink>
            <MobileLink
              href="/galleries"
              onClick={() => {
                handleClickTracking("/galleries", "Galleries")
              }}
            >
              Galleries
            </MobileLink>
            <MobileLink
              href="/fairs"
              onClick={() => {
                handleClickTracking("/fairs", "Fairs")
              }}
            >
              Fairs
            </MobileLink>
            <MobileLink
              href="/shows"
              onClick={() => {
                handleClickTracking("/shows", "Shows")
              }}
            >
              Shows
            </MobileLink>
            <MobileLink
              href="/institutions"
              onClick={() => {
                handleClickTracking("/institutions", "Museums")
              }}
            >
              Museums
            </MobileLink>
            <MobileLink
              href="/gallery-partnerships"
              onClick={() => {
                handleClickTracking(
                  "/gallery-partnerships",
                  "Partner with Artsy"
                )
              }}
            >
              Partner with Artsy
            </MobileLink>
            {user ? <LoggedInLinks /> : <AuthenticateLinks />}
          </ul>
        </AnimatingMenuWrapper>
      </MenuViewport>
    </NavigatorContextProvider>
  )
}

const MenuViewport = styled.nav`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`

export const AnimatingMenuWrapper = styled.div<{
  isOpen: boolean
}>`
  background: white;

  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  z-index: ${p => (p.isOpen ? 9999 : 0)};

  top: 0;
  left: 0; /* might be simpler to just animate this instead of the transform3d business */
  padding: 1em;

  transform: translate3d(${p => (p.isOpen ? "0" : "100%")}, 0, 0);
  transition: transform 0.15s;
  ul {
    margin-bottom: 40px;
  }
`

const Menu = ({ isOpen, title, links, showBacknav = true }) => {
  return (
    <AnimatingMenuWrapper isOpen={isOpen}>
      <Flex position="relative">
        {showBacknav && <BackLink />}
        <Sans size={["5", "6"]} color={color("black100")} mx="auto">
          {title}
        </Sans>
      </Flex>
      <ul>{links.map(link => NavLink({ link }))}</ul>
    </AnimatingMenuWrapper>
  )
}

const BackLink = () => {
  const { pop } = useNavigation()
  return (
    <Box position="absolute" top="-6px">
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          pop()
        }}
      >
        <ChevronIcon
          direction="left"
          color={color("black100")}
          height="10px"
          width="10px"
          top="7px"
          left="5px"
        />
      </a>
    </Box>
  )
}

const NavLink = ({ link }) => {
  const isSubMenu = !!link.menu
  const { trackEvent } = useTracking()

  if (isSubMenu) {
    return (
      <React.Fragment key={link.menu.title}>
        <MobileSubmenuLink menu={link.menu}>{link.text}</MobileSubmenuLink>
        {link.dividerBelow && <Separator my={1} color={color("black10")} />}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment key={link.href}>
        <MobileLink
          href={link.href}
          onClick={() => {
            trackEvent({
              context_module:
                AnalyticsSchema.ContextModule.HeaderArtworksDropdown,
              flow: "Header",
              subject: link.text,
              destination_path: link.href,
            })
          }}
        >
          {link.text}
        </MobileLink>
        {link.dividerBelow && <Separator my={1} color={color("black10")} />}
      </React.Fragment>
    )
  }
}

export const MobileSubmenuLink = ({ children, menu }) => {
  const { trackEvent } = useTracking()
  const { path, push } = useNavigation()
  return (
    <li>
      <Flex
        py={0.5}
        flexDirection="row"
        onClick={() => {
          push(menu.title)
        }}
      >
        <Sans size={["5t", "6"]} color={color("black60")}>
          {children}
        </Sans>
        <ChevronIcon
          direction="right"
          color={color("black60")}
          height="10px"
          width="10px"
          top="7px"
          left="5px"
        />
      </Flex>
      <Menu
        isOpen={path.includes(menu.title)}
        title={menu.title}
        links={menu.links}
      />
    </li>
  )
}

const AuthenticateLinks = () => {
  const { trackEvent } = useTracking()

  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      <MobileLink
        href={"/sign_up?intent=signup&trigger=click&contextModule=Header"}
        onClick={() => {
          trackEvent({
            context_module:
              AnalyticsSchema.ContextModule.HeaderArtworksDropdown,
            flow: "Header",
            subject: "Sign Up",
            destination_path:
              "/sign_up?intent=signup&trigger=click&contextModule=Header",
          })
        }}
      >
        Sign Up
      </MobileLink>
      <MobileLink
        href={"/log_in?intent=signup&trigger=click&contextModule=Header"}
        onClick={() => {
          trackEvent({
            context_module:
              AnalyticsSchema.ContextModule.HeaderArtworksDropdown,
            flow: "Header",
            subject: "Login",
            destination_path:
              "/log_in?intent=signup&trigger=click&contextModule=Header",
          })
        }}
      >
        Login
      </MobileLink>
    </Box>
  )
}

const LoggedInLinks = () => {
  const { trackEvent } = useTracking()

  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      <MobileLink
        href="/works-for-you"
        onClick={() => {
          trackEvent({
            context_module:
              AnalyticsSchema.ContextModule.HeaderArtworksDropdown,
            flow: "Header",
            subject: "Works for you",
            destination_path: "/works-for-you",
          })
        }}
      >
        Works for you{" "}
      </MobileLink>
      <MobileLink
        href="/user/edit"
        onClick={() => {
          trackEvent({
            context_module:
              AnalyticsSchema.ContextModule.HeaderArtworksDropdown,
            flow: "Header",
            subject: "Account",
            destination_path: "/user/edit",
          })
        }}
      >
        Account
      </MobileLink>
    </Box>
  )
}
