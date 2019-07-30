import { Box, Sans } from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"

export const VanguardTableOfContents: React.SFC<{
  article: ArticleData
}> = props => {
  return (
    <Box>
      <Sans size="8">Table of Contents</Sans>
    </Box>
  )
}
