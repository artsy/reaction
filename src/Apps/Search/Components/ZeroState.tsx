import { Box, Flex, Serif } from "@artsy/palette"
import { SendFeedback } from "Apps/Search/Components/SendFeedback"
import React, { FC } from "react"

interface Props {
  term: string
  entity: string
}

export const ZeroState: FC<Props> = props => {
  const { term, entity } = props

  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box m={3} textAlign="center">
        <Serif size="6">
          {`We couldn't find any ${entity} for 
        "${term}"`}
        </Serif>

        <Serif size="3">
          Try checking your spelling or try another search term.
        </Serif>
      </Box>

      <Box width="100%">
        <SendFeedback />
      </Box>
    </Flex>
  )
}
