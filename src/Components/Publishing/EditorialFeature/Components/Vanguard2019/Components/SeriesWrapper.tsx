import { Box, Sans } from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import { VanguardArtistWrapper } from "./ArtistWrapper"

export const VanguardSeriesWrapper: React.SFC<{
  article: ArticleData
}> = props => {
  const { relatedArticles, title } = props.article
  return (
    <Box>
      <Sans size="6">Sub-Series Article: {title}</Sans>
      {/** map sub-series artist articles */}
      {relatedArticles &&
        relatedArticles.map(artistArticle => (
          <VanguardArtistWrapper article={artistArticle} />
        ))}
    </Box>
  )
}
