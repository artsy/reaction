import React, { useContext } from "react"
import styled from "styled-components"

import {
  Box,
  CloseIcon,
  color,
  Flex,
  Link,
  MenuIcon,
  Separator,
  Serif,
} from "@artsy/palette"

import { SystemContext } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import * as auth from "Components/NavBar/Utils/auth"

export const MobileNavMenu: React.FC = () => {
  const { trackEvent } = useTracking()
  const { mediator, user } = useContext(SystemContext)
  const isLoggedIn = Boolean(user)

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.getAttribute("href")

    trackEvent({
      subject: text,
      destination_path: href,
    })
  }

  return (
    <MobileNavContainer
      px={2}
      py={1}
      width="100%"
      flexDirection="column"
      onClick={trackClick}
    >
      <MobileLink href="/">Home</MobileLink>
      <MobileLink href="/artists">Artists</MobileLink>
      <MobileLink href="/shows">Shows</MobileLink>
      <MobileLink href="/galleries">Galleries</MobileLink>
      <MobileLink href="/institutions">Museums</MobileLink>
      <MobileLink href="/fairs">Fairs</MobileLink>
      <MobileLink href="/auctions">Auctions</MobileLink>
      <MobileLink href="/articles">Magazine</MobileLink>

      <Separator my={1} />

      {isLoggedIn ? (
        <>
          <MobileLink href="/works-for-you">Works for you</MobileLink>
          <MobileLink href="/user/edit">Account</MobileLink>
        </>
      ) : (
        <>
          <MobileLink onClick={() => auth.login(mediator)}>Login</MobileLink>
          <MobileLink onClick={() => auth.signup(mediator)}>Sign up</MobileLink>
        </>
      )}
    </MobileNavContainer>
  )
}

interface MobileLinkProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

const MobileLink: React.FC<MobileLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Box my={0.5} {...props} style={{ cursor: "pointer" }}>
      {href ? (
        <Link href={href} underlineBehavior="none">
          <Serif size="4">{children}</Serif>
        </Link>
      ) : (
        <Serif size="4">{children}</Serif>
      )}
    </Box>
  )
}

const MobileNavContainer = styled(Flex)`
  background-color: white;
  border-bottom: 1px solid ${color("black10")};
  position: relative;
  z-index: 2;
`

export const MobileToggleIcon: React.FC<{ open: boolean }> = ({ open }) => {
  return open ? <CloseIcon /> : <MenuIcon />
}
