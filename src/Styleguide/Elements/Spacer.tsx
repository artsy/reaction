import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { SpaceProps } from "styled-system"

export const Spacer: React.SFC<SpaceProps> = props => {
  return <Box {...props} />
}
