import { Box, Sans, Serif } from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import { times } from "lodash"
import React from "react"

export const VanguardTableOfContents: React.SFC<{
  article: ArticleData
}> = props => {
  const { relatedArticles } = props.article
  return (
    <Box pb={4} maxWidth={1000} mx="auto" textAlign="center" minHeight="70vh">
      <Sans size="8" mb={4}>
        Table of Contents
      </Sans>

      {relatedArticles &&
        relatedArticles.map((subSeries, i) => (
          <Box key={i}>
            <Serif size="8">{times(i + 1, () => "I")}</Serif>
            <Sans size="8">{subSeries.title}</Sans>
          </Box>
        ))}
    </Box>
  )
}
