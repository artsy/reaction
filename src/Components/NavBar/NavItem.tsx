import { Box, BoxProps, Link, Sans, space } from "@artsy/palette"
import { AnalyticsSchema } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import { isFunction, isString } from "lodash"
import React, { useEffect, useState } from "react"
import { animated, config, useSpring } from "react-spring"
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
  isFullScreenDropDown?: boolean
  label?: string
}

type Position = React.CSSProperties["position"]

export const NavItem: React.FC<NavItemProps> = ({
  Menu,
  Overlay,
  active = false,
  children,
  className,
  display = "block",
  href,
  onClick,
  isFullScreenDropDown,
  label,
}) => {
  const navItemLabel = children
  const { trackEvent } = useTracking()
  const [hover, toggleHover] = useState(active)
  const showMenu = Boolean(Menu && hover)
  const showOverlay = Boolean(Overlay)
  const hoverColor = hover ? "purple100" : "black80"
  const getAnimation = h => ({
    opacity: h ? 0 : 1,
    transform: `translate3d(0, ${h ? -90 : -65}px, 0)`,
    position: isFullScreenDropDown ? ("absolute" as Position) : "static",
    left: "0px",
  })
  const animatedStyle = useSpring({
    from: getAnimation(hover),
    ...getAnimation(!hover),
    config: name =>
      name === "opacity"
        ? config.stiff
        : {
            friction: 10,
            mass: 0.1,
          },
  })

  const trackClick = () => {
    if (href && isString(navItemLabel)) {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: navItemLabel, // Text passed into the NavItem
        destination_path: href,
      })
    }
  }

  const trackHover = () => {
    if (isString(navItemLabel) || label)
      trackEvent({
        action_type: AnalyticsSchema.ActionType.Hover,
        subject: navItemLabel.toString() || label,
      })
  }

  useEffect(() => {
    if (hover) {
      trackHover()
    }
  }, [hover])

  return (
    <Box
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <Link
        href={href}
        color={hoverColor}
        underlineBehavior="none"
        px={1}
        py={2}
        className={className}
        display={display}
        position="relative"
        style={{ cursor: "pointer" }}
        onClick={() => {
          trackClick()
          onClick && onClick()
        }}
      >
        <Sans size="3" weight="medium" color={hoverColor}>
          <Box height={25}>
            {isFunction(navItemLabel)
              ? // NavItem children can be called as renderProps so that contents
                // can operate on UI behaviors (such as changing the color of an
                // icon on hover).
                navItemLabel({
                  hover,
                })
              : navItemLabel}
          </Box>
        </Sans>
      </Link>

      {showMenu && (
        <animated.div style={animatedStyle}>
          <MenuContainer top={space(6)} isFullScreen={isFullScreenDropDown}>
            <Menu />
          </MenuContainer>
        </animated.div>
      )}

      {showOverlay && <Overlay hover={hover} />}
    </Box>
  )
}

const MenuContainer = styled(Box)<{ isFullScreen?: boolean }>`
  position: absolute;
  margin-top: ${p => (p.isFullScreen ? "1px" : "-1px")}; /* Offset border */
  transform: translateX(${p => (p.isFullScreen ? 0 : "-78%")});
`
