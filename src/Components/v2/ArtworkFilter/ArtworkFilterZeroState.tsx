import { Box, Flex, Serif } from "@artsy/palette"
import React, { FC } from "react"
import { useFilterContext } from "./ArtworkFilterContext"

// Should this feedback form be more generally moved to artwork filter
import { SendFeedback } from "Apps/Search/Components/SendFeedback"

interface Props {
  term: string
}

export const ArtworkFilterZeroState: FC<Props> = props => {
  const { hasFilters } = useFilterContext()

  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box m={3} textAlign="center">
        <Serif size="6">
          {hasFilters
            ? "No results found."
            : `No results found for "${props.term}".`}
        </Serif>
        <Serif size="3">
          {hasFilters
            ? "Try removing some filters or try another search term."
            : "Try checking for spelling errors or try another search term."}
        </Serif>
      </Box>
      <Box width="100%">
        {/* FIXME: Should this feedback form be moved to the filter component? */}
        <SendFeedback />
      </Box>
    </Flex>
  )
}
