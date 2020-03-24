import React, { useState } from "react"
import styled from "styled-components"

import { Box, color, Link, Sans } from "@artsy/palette"

interface MobileLinkProps {
  children: React.ReactNode
  href?: string
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

export const MobileLink: React.FC<MobileLinkProps> = ({
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
      <Box>
        {href ? (
          <Link href={href} underlineBehavior="none">
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
