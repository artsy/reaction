import { Box, color, Separator } from "@artsy/palette"
import React from "react"

const FilterSidebarSection: React.SFC<any> = props => {
  return (
    <>
      <Box
        width={100}
        height={8}
        style={{ marginTop: "20px", backgroundColor: color("black10") }}
      />
      <Box
        width={120}
        height={8}
        style={{ marginTop: "20px", backgroundColor: color("black10") }}
      />
      <Box
        width={120}
        height={8}
        style={{ marginTop: "20px", backgroundColor: color("black10") }}
      />
      <Box
        width={120}
        height={8}
        style={{ marginTop: "20px", backgroundColor: color("black10") }}
      />
      <Box
        width={120}
        height={8}
        style={{ marginTop: "20px", backgroundColor: color("black10") }}
      />
    </>
  )
}

export const FilterSidebar: React.SFC<any> = props => {
  return (
    <Box style={{ width: "25%" }}>
      <FilterSidebarSection />
      <Separator mt={2} />
      <FilterSidebarSection />
      <Separator mt={2} />
      <FilterSidebarSection />
    </Box>
  )
}
