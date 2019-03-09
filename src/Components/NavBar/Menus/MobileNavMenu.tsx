import { Box, color, Flex, Link, Separator, Serif } from "@artsy/palette"
import { CloseIcon, Icon } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

export const MobileNavMenu = props => {
  return (
    <MobileNavContainer px={2} py={1} width="100%" flexDirection="column">
      <MobileLink href="/">Home</MobileLink>
      <MobileLink href="/artists">Artists</MobileLink>
      <MobileLink href="/shows">Shows</MobileLink>
      <MobileLink href="/galleries">Galleries</MobileLink>
      <MobileLink href="/institutions">Museums</MobileLink>
      <MobileLink href="/articles">Editorial</MobileLink>
      <MobileLink href="/artworks">Artworks</MobileLink>
      <MobileLink href="/fairs">Fairs</MobileLink>
      <MobileLink href="/auctions">Auctions</MobileLink>

      <Separator my={1} />

      <MobileLink href="/works-for-you">Works for you</MobileLink>
      <MobileLink href="/user/edit">Account</MobileLink>
    </MobileNavContainer>
  )
}

const MobileLink = ({ href, children }) => {
  return (
    <Box my={0.5}>
      <Link href={href} underlineBehavior="none">
        <Serif size="4">{children}</Serif>
      </Link>
    </Box>
  )
}

const MobileNavContainer = styled(Flex)`
  background-color: white;
  border-bottom: 1px solid ${color("black10")};
`

// FIXME: Need mobile nav icon from Jeffry

export const MobileToggleIcon: React.FC<{ open: boolean }> = ({ open }) => {
  return open ? (
    <CloseIcon fill="black100" />
  ) : (
    <Icon width="18" height="18" id="Layer_1" viewBox="0 0 32 32">
      <svg>
        <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z" />
      </svg>
    </Icon>
  )
}
