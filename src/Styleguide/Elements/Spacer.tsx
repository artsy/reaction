import React from "react"
import { SpaceProps } from "styled-system"
import { Box } from "Styleguide/Elements/Box"

export const Spacer: React.SFC<SpaceProps> = props => {
  return <Box {...props} />
}
