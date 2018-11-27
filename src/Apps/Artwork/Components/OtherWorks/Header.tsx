import { Button, Flex, Serif } from "@artsy/palette"
import React from "react"

interface HeaderProps {
  title: string
  buttonHref: string
}

export const Header: React.SFC<HeaderProps> = props => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Serif size="8" color="black100" mb={2}>
        {props.title}
      </Serif>
      <Button
        variant="secondaryOutline"
        mb={3}
        // FIXME: Move to <Link> component once https://github.com/artsy/palette/pull/130 is merged
        onClick={() => (window.location.href = props.buttonHref)}
      >
        View all
      </Button>
    </Flex>
  )
}
