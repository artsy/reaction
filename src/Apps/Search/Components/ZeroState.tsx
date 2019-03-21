import { Box, Flex, Serif } from "@artsy/palette"
import React, { FC } from "react"

interface Props {
  term: string
  entity: string
}

export const ZeroState: FC<Props> = props => {
  const { term, entity } = props

  return (
    <Flex
      height="212px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Serif size="6">
          {`We couldn't find any ${entity} for 
        "${term}"`}
        </Serif>
      </Box>
      <Box>
        <Serif size="3">
          Try checking your spelling or try another search term.
        </Serif>
      </Box>
    </Flex>
  )
}
