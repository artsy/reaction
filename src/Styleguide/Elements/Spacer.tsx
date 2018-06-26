import React from "react"
import { SpaceProps } from "styled-system"
import { Box } from "Styleguide/Elements/Box"

export const Spacer: React.SFC<SpaceProps & { id?: string }> = props => {
  return <Box {...props} />
}
