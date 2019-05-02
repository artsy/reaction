import { Box, BoxProps, Link, Sans } from "@artsy/palette"
import React, { useState } from "react"
import styled from "styled-components"

interface NavItemProps extends BoxProps {
  Menu?: React.FC
  Overlay?: React.FC
  href?: string
  active?: boolean
  onClick?: () => void
}

export const NavItem: React.FC<NavItemProps> = ({
  Menu,
  Overlay,
  active = false,
  children,
  display = "block",
  href,
  onClick,
}) => {
  const [hover, toggleHover] = useState(active)
  const showMenu = Boolean(Menu && hover)
  const showOverlay = Boolean(Overlay)
  const hoverColor = hover ? "purple100" : "black80"

  return (
    <Box
      p={1}
      display={display}
      position="relative"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      onClick={onClick}
    >
      <Link href={href} color={hoverColor} underlineBehavior="none">
        <Sans size="3" weight="medium" color={hoverColor}>
          {children}
        </Sans>
      </Link>

      {showMenu && (
        <MenuContainer>
          <Menu />
        </MenuContainer>
      )}

      {showOverlay && <Overlay />}
    </Box>
  )
}

const MenuContainer = styled(Box)`
  position: absolute;
  transform: translate(-80%);
  padding-top: 18px;
`
