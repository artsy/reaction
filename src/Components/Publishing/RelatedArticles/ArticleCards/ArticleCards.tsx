import { Box } from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import { ArticleCard } from "./ArticleCard"

interface Props {
  series?: ArticleData
  color?: string
  relatedArticles?: any
}

export const ArticleCards: React.SFC<Props> = props => {
  const { color, relatedArticles, series } = props

  return (
    <Box color={color}>
      {relatedArticles.map((relatedArticle, i) => {
        return (
          <Box mb={[40, 60]}>
            <ArticleCard
              article={relatedArticle}
              color={color}
              series={series}
            />
          </Box>
        )
      })}
    </Box>
  )
}

ArticleCards.defaultProps = {
  color: "black",
}
