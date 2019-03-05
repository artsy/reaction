import { Box, BoxProps, Link as TextLink, Sans } from "@artsy/palette"
import React, { useState } from "react"
import styled from "styled-components"

interface NavItemProps extends BoxProps {
  Menu?: React.FC
  href?: string
}

export const NavItem: React.FC<NavItemProps> = ({
  Menu,
  display = "block",
  children,
  href,
}) => {
  const [hover, toggleHover] = useState(false)
  const showMenu = Boolean(Menu && hover)
  const hoverColor = hover ? "purple100" : "black80"

  return (
    <Box
      p={1}
      display={display}
      position="relative"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <TextLink href={href} color={hoverColor}>
        <Sans size="3" weight="medium" color={hoverColor}>
          {children}
        </Sans>
      </TextLink>
      {showMenu && (
        <MenuContainer>
          <Menu />
        </MenuContainer>
      )}
    </Box>
  )
}

const MenuContainer = styled(Box)`
  position: absolute;
  transform: translate(-80%);
  padding-top: 18px;
`
