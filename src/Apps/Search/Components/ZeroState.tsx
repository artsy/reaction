import { Box, Flex, Serif } from "@artsy/palette"
import { SendFeedback } from "Apps/Search/Components/SendFeedback"
import React, { FC } from "react"

interface Props {
  term: string
  query: {}
}

export const ZeroState: FC<Props> = props => {
  const { term, query } = props
  const hasFilters = Object.keys(query).length > 1

  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box m={3} textAlign="center">
        <Serif size="6">
          {hasFilters ? "No results found." : `No results found for "${term}".`}
        </Serif>
        <Serif size="3">
          {hasFilters
            ? "Try removing some filters or try another search term."
            : "Try checking for spelling errors or try another search term."}
        </Serif>
      </Box>
      <Box width="100%">
        <SendFeedback />
      </Box>
    </Flex>
  )
}
