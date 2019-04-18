import { Box, color, Spacer } from "@artsy/palette"
import React from "react"

export const GridItem: React.SFC<any> = props => {
  return (
    <Box style={{ margin: "0 5px 30px 5px" }}>
      <Box
        height={props.height}
        style={{ backgroundColor: color("black10") }}
      />
      <Box
        width={80}
        height={6}
        style={{ marginTop: 10, backgroundColor: color("black10") }}
      />
      <Box
        width={140}
        height={6}
        style={{ marginTop: 5, backgroundColor: color("black10") }}
      />
      <Box
        width={120}
        height={6}
        style={{ marginTop: 5, backgroundColor: color("black10") }}
      />
      <Box
        width={110}
        height={6}
        style={{ marginTop: 5, backgroundColor: color("black10") }}
      />
      <Spacer />
    </Box>
  )
}
