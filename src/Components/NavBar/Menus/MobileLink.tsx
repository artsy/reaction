import { AnalyticsSchema } from "Artsy"
import { useTracking } from "Artsy/Analytics"
import React, { useState } from "react"
import styled from "styled-components"

import { Box, color, Link, Sans } from "@artsy/palette"

interface MobileLinkProps {
  contextModule?: string
  children: React.ReactNode
  href?: string
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

export const MobileLink: React.FC<MobileLinkProps> = ({
  href,
  children,
  contextModule,
  ...props
}) => {
  const [isPressed, setPressed] = useState(false)
  const bg = isPressed ? "black5" : "white100"
  const { trackEvent } = useTracking()

  const handleClickTracking = (linkHref: string) => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: contextModule,
      flow: "Header",
      subject: children.toString(),
      destination_path: linkHref,
    })
  }

  return (
    <MobileLinkContainer
      py={0.5}
      style={{ cursor: "pointer" }}
      bg={bg}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      {...props}
    >
      <Box>
        {href ? (
          <Link
            href={href}
            underlineBehavior="none"
            onClick={() => handleClickTracking(href)}
          >
            <Sans size={["5t", "6"]} color={color("black60")}>
              {children}
            </Sans>
          </Link>
        ) : (
          <Sans size={["5t", "6"]} color={color("black60")}>
            {children}
          </Sans>
        )}
      </Box>
    </MobileLinkContainer>
  )
}

const MobileLinkContainer = styled(Box)<{ disableHover?: boolean }>`
  background-color: white;
  transition: 0.3s linear;
  cursor: pointer;

  &:hover {
    background-color: ${p =>
      p.disableHover ? "transparent" : color("black5")};
  }
`
