import React from "react"
import { Box, Sans, Spacer, Serif } from "@artsy/palette"

export const ViewingRoomStatements: React.FC = props => {
  return (
    <Box>
      {/* Pull quote */}
      <Box>
        <Sans size="8" textAlign="center">
          Traces of bodies abound in Kwak’s hollowed forms, burnished
          ectoplasmic impressions asserting a queer immanence. Their poses
          simultaneously suggest supplication, pleasure, distress, nostalgia,
          the past, the present, and the future.
        </Sans>
      </Box>

      <Spacer my={4} />

      {/* Statement 1 */}
      <Box>
        <Serif size="5">
          Young Joon Kwak (b. 1984 in Queens, NY) is a LA-based
          multi-disciplinary artist working primarily through sculpture,
          performance, video, and collaboration. Kwak's work reimagines the
          form, functionality, and materiality of objects in order to propose
          different ways of viewing and interpreting bodies and the physical and
          social spaces that govern our everyday lives as mutable, inclusive,
          and open-ended. Kwak's work reimagines the form, functionality, and
          materiality of objects in order to propose different ways of viewing
          and interpreting bodies and the physical and social spaces that govern
          our everyday lives as mutable, inclusive, and open-ended.
        </Serif>
      </Box>

      <Spacer my={4} />

      <>
        <Box>
          <Sans size="5">Subheadline</Sans>
        </Box>

        <Spacer my={1} />

        {/* Statement 2 */}
        <Box>
          <Serif size="5">
            Young Joon Kwak (b. 1984 in Queens, NY) is a LA-based
            multi-disciplinary artist working primarily through sculpture,
            performance, video, and collaboration. Kwak's work reimagines the
            form, functionality, and materiality of objects in order to propose
            different ways of viewing and interpreting bodies and the physical
            and social spaces that govern our everyday lives as mutable,
            inclusive, and open-ended. Kwak's work reimagines the form,
            functionality, and materiality of objects in order to propose
            different ways of viewing and interpreting bodies and the physical
            and social spaces that govern our everyday lives as mutable,
            inclusive, and open-ended.
          </Serif>
        </Box>
      </>
    </Box>
  )
}
