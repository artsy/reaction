import React, { useContext, useState } from "react"
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
import * as authentication from "Components/NavBar/Utils/authentication"

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
      py={[1, 4]}
      width="100%"
      height="100vh"
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

      <Box px={2}>
        <Separator my={[1, 4]} />
      </Box>

      {isLoggedIn ? (
        <>
          <MobileLink href="/works-for-you">Works for you</MobileLink>
          <MobileLink href="/user/edit">Account</MobileLink>
        </>
      ) : (
        <>
          <MobileLink onClick={() => authentication.login(mediator)}>
            Login
          </MobileLink>
          <MobileLink onClick={() => authentication.signup(mediator)}>
            Sign up
          </MobileLink>
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
  const [isPressed, setPressed] = useState(false)
  const bg = isPressed ? "black5" : "white100"

  return (
    <MobileLinkContainer
      py={0.5}
      style={{ cursor: "pointer" }}
      bg={bg}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      {...props}
    >
      <Box px={2} py={[0, 0.5]}>
        {href ? (
          <Link href={href} underlineBehavior="none">
            <Serif size={["4", "8"]}>{children}</Serif>
          </Link>
        ) : (
          <Serif size={["4", "8"]}>{children}</Serif>
        )}
      </Box>
    </MobileLinkContainer>
  )
}

const MobileNavContainer = styled(Flex)`
  background-color: white;
  border-bottom: 1px solid ${color("black10")};
  position: relative;
  z-index: 2;
  user-select: none;
`

const MobileLinkContainer = styled(Box)<{ disableHover?: boolean }>`
  background-color: white;
  transition: 0.3s linear;
  cursor: pointer;

  &:hover {
    background-color: ${p =>
      p.disableHover ? "transparent" : color("black5")};
  }
`

export const MobileToggleIcon: React.FC<{ open: boolean }> = ({ open }) => {
  const style = { transform: "scale(1.5)", top: 2 }
  return open ? <CloseIcon style={style} /> : <MenuIcon style={style} />
}
