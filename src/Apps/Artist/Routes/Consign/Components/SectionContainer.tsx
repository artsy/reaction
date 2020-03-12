import { Color, color, Flex, FlexProps } from "@artsy/palette"
import React from "react"

interface SectionContainerProps extends FlexProps {
  background?: Color | "#EAE5E7"
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  background = "white100",
  ...rest
}) => {
  // For sections with bg-colors outside of our design system
  const bg = background === "#EAE5E7" ? "#EAE5E7" : color(background)

  return (
    <Flex
      background={bg}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={2}
      style={{ border: "1px solid gray" }}
      {...rest}
    >
      {children}
    </Flex>
  )
}
