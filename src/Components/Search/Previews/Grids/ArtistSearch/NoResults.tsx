import { Flex, Serif } from "@artsy/palette"
import React from "react"

const ArtworkIcon: React.SFC = () => {
  return (
    <svg width="18px" height="18px" viewBox="2 2 14 14" version="1.1">
      <title>Artwork</title>
      <desc>Artwork icon</desc>
      <g
        id="Indicator/Artwork/Md"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.68794719,6 L9.04687494,2.24412276 L12.3137773,6 L15,6 L15,15 L3,15 L3,6 L5.68794719,6 Z M7.02951148,6 L10.9884205,6 L9.03645839,3.75587724 L7.02951148,6 Z M4,7 L4,14 L14,14 L14,7 L4,7 Z M6,9 L6,12 L12,12 L12,9 L6,9 Z M5,8 L13,8 L13,13 L5,13 L5,8 Z"
          id="Combined-Shape"
          fill="#000000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

export const NoResultsPreview: React.SFC = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      my={140}
      pr={3}
    >
      <ArtworkIcon />
      <Serif
        size="2"
        color="black100"
        mt={1}
        mx={[0, 2, 2, "115px"]}
        textAlign="center"
      >
        This artist does not have any work on Artsy yet.
      </Serif>
    </Flex>
  )
}
