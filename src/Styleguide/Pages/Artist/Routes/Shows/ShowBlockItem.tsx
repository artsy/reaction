import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { ResponsiveImage } from "Styleguide/Elements/Image"
import { Serif } from "@artsy/palette"

export const ShowBlockItem = props => {
  return (
    <Box maxWidth="460px" width={props.blockWidth} height="auto" p={1}>
      <a href="#" className="noUnderline">
        <ResponsiveImage src="https://picsum.photos/460/400/?random" />
        <Serif size="3t">Room With Its Own Rules</Serif>
      </a>
      <Serif size="2" color="black60">
        <a href="#" className="noUnderline">
          Toth Gallery
        </a>
      </Serif>
      <Serif size="1" color="black60">
        Miami, May 30 – Jun 21
      </Serif>
    </Box>
  )
}
