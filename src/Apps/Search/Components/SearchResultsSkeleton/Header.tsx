import { Box, color, Separator } from "@artsy/palette"
import React from "react"

export const Header: React.SFC<any> = props => {
  return (
    <Box height={100} mb={30} mt={[40, 120]}>
      <Box mb={40} background={color("black10")} width={320} height={20} />
      <Box width={700}>
        <Box
          width={80}
          height={12}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
        <Box
          width={80}
          height={12}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
        <Box
          width={80}
          height={12}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
        <Box
          width={80}
          height={12}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
        <Box
          width={80}
          height={12}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
        <Box
          width={80}
          height={12}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
      </Box>
      <Separator mt={10} />
    </Box>
  )
}
