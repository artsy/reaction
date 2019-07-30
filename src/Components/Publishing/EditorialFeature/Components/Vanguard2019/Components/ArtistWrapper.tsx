import { Box, Sans } from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"

export const VanguardArtistWrapper: React.SFC<{
  article: ArticleData
}> = props => {
  const { article } = props
  return (
    <Box>
      <Sans size="6">artist: {article.title}</Sans>
    </Box>
  )
}
