import { Box, BoxProps, Link, Sans } from "@artsy/palette"
import { isString } from "lodash"
import React, { useState } from "react"
import styled from "styled-components"
import { useTracking } from "./Utils/useTracking"

interface NavItemProps extends BoxProps {
  Menu?: React.FC
  Overlay?: React.FC
  active?: boolean
  className?: string
  href?: string
  onClick?: () => void
}

export const NavItem: React.FC<NavItemProps> = ({
  Menu,
  Overlay,
  active = false,
  children,
  className,
  display = "block",
  href,
  onClick,
}) => {
  const { tracking } = useTracking()
  const [hover, toggleHover] = useState(active)
  const showMenu = Boolean(Menu && hover)
  const showOverlay = Boolean(Overlay)
  const hoverColor = hover ? "purple100" : "black80"

  const trackClick = () => {
    if (href && isString(children)) {
      tracking.trackEvent({
        subject: children, // Text passed into the NavItem
        destination_path: href,
      })
    }
  }

  return (
    <Box
      p={1}
      className={className}
      display={display}
      position="relative"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      onClick={() => {
        trackClick()
        onClick && onClick()
      }}
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
