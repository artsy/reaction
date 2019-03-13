import { Box, color, Flex, Link, Separator, Serif } from "@artsy/palette"
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
