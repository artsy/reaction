import { Box, ChevronIcon, color, Flex, Sans, Separator } from "@artsy/palette"
import { useSystemContext } from "Artsy"
import React, { useState } from "react"
import styled from "styled-components"
import { MenuData } from "../menuData"
import { MobileLink } from "./MobileLink"

interface Props {
  isOpen: boolean
  menuData: MenuData
}

export const NewMobileNavMenu: React.FC<Props> = props => {
  const {
    links: [artworks, artists],
  } = props.menuData

  const [path, setPath] = useState([])
  const { user } = useSystemContext()

  const push = entry => {
    setPath(prevState => {
      return [...prevState, entry]
    })
  }

  const pop = () => {
    setPath(prevState => {
      return prevState.slice(0, prevState.length - 1)
    })
  }

  return (
    <MenuViewport>
      <AnimatingMenuWrapper isOpen={props.isOpen}>
        <ul>
          <MobileSubmenuLink
            menu={artworks.menu}
            path={path}
            push={push}
            pop={pop}
          >
            {artworks.menu.title}
          </MobileSubmenuLink>

          <MobileSubmenuLink
            menu={artists.menu}
            path={path}
            push={push}
            pop={pop}
          >
            {artists.menu.title}
          </MobileSubmenuLink>
          <MobileLink href="/auctions">Auctions</MobileLink>
          <MobileLink href="/articles">Editorial</MobileLink>
          <MobileLink href="/galleries">Galleries</MobileLink>
          <MobileLink href="/fairs">Fairs</MobileLink>
          <MobileLink href="/shows">Shows</MobileLink>
          <MobileLink href="/institutions">Museums</MobileLink>
          <MobileLink href="/gallery-partnerships">
            Partner with Artsy
          </MobileLink>
          {user ? <LoggedInLinks /> : <AuthenticateLinks />}
        </ul>
      </AnimatingMenuWrapper>
    </MenuViewport>
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
  overflow: hidden;
  z-index: ${p => (p.isOpen ? 9999 : 0)};

  top: 0;
  left: 0; /* might be simpler to just animate this instead of the transform3d business */
  padding: 1em;

  transform: translate3d(${p => (p.isOpen ? "0" : "100%")}, 0, 0);
  transition: transform 0.15s;
`

const Menu = ({
  isOpen,
  title,
  links,
  path,
  push,
  pop,
  showBacknav = true,
}) => {
  return (
    <AnimatingMenuWrapper isOpen={isOpen}>
      <Flex position="relative">
        {showBacknav && <BackLink pop={pop} />}
        <Sans size={["5", "6"]} color={color("black100")} mx="auto">
          {title}
        </Sans>
      </Flex>
      <ul>{links.map(link => NavLink({ link, path, push, pop }))}</ul>
    </AnimatingMenuWrapper>
  )
}

const BackLink = ({ pop }) => {
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

const NavLink = ({ link, path, push, pop }) => {
  const isSubMenu = !!link.menu
  if (isSubMenu) {
    return (
      <>
        <MobileSubmenuLink
          key={link.menu.title}
          menu={link.menu}
          path={path}
          push={push}
          pop={pop}
        >
          {link.text}
        </MobileSubmenuLink>
        {link.dividerBelow && <Separator my={1} color={color("black10")} />}
      </>
    )
  } else {
    return (
      <>
        <MobileLink key={link.href} href={link.href}>
          {link.text}
        </MobileLink>
        {link.dividerBelow && <Separator my={1} color={color("black10")} />}
      </>
    )
  }
}

export const MobileSubmenuLink = ({ children, menu, path, push, pop }) => {
  console.log("MenuLink got", path)
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
        path={path}
        push={push}
        pop={pop}
      />
    </li>
  )
}

const AuthenticateLinks = () => {
  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      <li>
        <MobileLink
          href={`/sign_up?intent=signup&signupIntent=signup&trigger=click&contextModule=Header`}
        >
          Sign Up
        </MobileLink>
      </li>
      <li>
        <MobileLink
          href={`/log_in?intent=signup&signupIntent=signup&trigger=click&contextModule=Header`}
        >
          Login
        </MobileLink>
      </li>
    </Box>
  )
}

const LoggedInLinks = () => {
  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      <li>
        <MobileLink href="/works-for-you">Works for you </MobileLink>
      </li>
      <li>
        <MobileLink href="/user/edit">Account</MobileLink>
      </li>
    </Box>
  )
}
