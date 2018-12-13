import { Button, Flex, Serif } from "@artsy/palette"
import React from "react"

interface HeaderProps {
  buttonHref?: string
  children?: JSX.Element
  title: string
}

export const Header: React.SFC<HeaderProps> = props => {
  const { buttonHref, children, title } = props

  return (
    <Flex flexDirection="column" alignItems="center">
      <Serif size="8" color="black100" mb={2} textAlign="center">
        {title}
      </Serif>
      {buttonHref && (
        <Button
          variant="secondaryOutline"
          mb={3}
          // FIXME: Move to <Link> component once https://github.com/artsy/palette/pull/130 is merged
          onClick={() => (window.location.href = buttonHref)}
        >
          View all
        </Button>
      )}
      {children}
    </Flex>
  )
}
