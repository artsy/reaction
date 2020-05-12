import React from "react"
import styled from "styled-components"
import { Box, BoxProps, color, Sans, CSSGrid } from "@artsy/palette"

const Container = styled(Box)`
  border-top: 1px solid ${color("black100")};
  border-bottom: 1px solid ${color("black100")};

  & + & {
    margin-top: -1px;
  }

  &:last-of-type {
    border-bottom: 0;
  }
`

export type FeatureSetProps = Omit<BoxProps, "color">

export const FeatureSet: React.FC<FeatureSetProps> = ({
  children,
  ...rest
}) => {
  const count = React.Children.count(children)

  return (
    <Container {...rest}>
      <Box mt={4} mb={2}>
        {/* OrderedSet#title */}
        <Sans size="6" color="black100">
          Selected works
        </Sans>

        {/* OrderedSet#subtitle */}
        <Sans size="3" color="black60">
          Selected in collaboration with our curators in Berlin.
        </Sans>
      </Box>

      <CSSGrid
        mt={2}
        mb={4}
        gridTemplateColumns={[
          "repeat(1fr)",
          `repeat(${Math.min(count, 2)}, 1fr)`,
          `repeat(${Math.min(count, 3)}, 1fr)`,
        ]}
        gridGap={2}
      >
        {children}
      </CSSGrid>
    </Container>
  )
}
