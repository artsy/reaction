import { Box, BoxProps, Link, Sans } from "@artsy/palette"
import { useTracking } from "Artsy/Analytics/useTracking"
import { isFunction, isString } from "lodash"
import React, { useState } from "react"
import styled from "styled-components"

interface NavItemProps extends BoxProps {
  Menu?: React.FC
  Overlay?: React.FC<{
    hover: boolean
  }>
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
  const { trackEvent } = useTracking()
  const [hover, toggleHover] = useState(active)
  const showMenu = Boolean(Menu && hover)
  const showOverlay = Boolean(Overlay)
  const hoverColor = hover ? "purple100" : "black80"

  const trackClick = () => {
    if (href && isString(children)) {
      trackEvent({
        subject: children, // Text passed into the NavItem
        destination_path: href,
      })
    }
  }

  return (
    <Box
      px={1}
      py={2}
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
          <Box height={25}>
            {isFunction(children)
              ? // NavItem children can be called as renderProps so that contents
                // can operate on UI behaviors (such as changing the color of an
                // icon on hover).
                children({
                  hover,
                })
              : children}
          </Box>
        </Sans>
      </Link>

      {showMenu && (
        <MenuContainer>
          <Menu />
        </MenuContainer>
      )}

      {showOverlay && <Overlay hover={hover} />}
    </Box>
  )
}

const MenuContainer = styled(Box)`
  position: absolute;
  transform: translateX(-90%);
  top: 63px;
`
