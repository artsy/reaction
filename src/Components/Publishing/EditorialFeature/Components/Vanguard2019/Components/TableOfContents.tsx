import { Box, Sans, Serif } from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import { times } from "lodash"
import React from "react"
import styled from "styled-components"
import { slugify } from "underscore.string"

export const VanguardTableOfContents: React.SFC<{
  article: ArticleData
  onChangeSection: (slug: string) => void
}> = props => {
  const {
    article: { relatedArticles },
    onChangeSection,
  } = props

  return (
    <Box pb={100} maxWidth={1000} mx="auto" textAlign="center" minHeight="70vh">
      <Sans size="16" mb={4}>
        Table of Contents
      </Sans>

      {relatedArticles &&
        relatedArticles.map((subSeries, i) => (
          <SeriesContainer
            key={i}
            onClick={() => onChangeSection(slugify(subSeries.title))}
          >
            <Serif size="12" pb={2}>
              {times(i + 1, () => "I")}
            </Serif>
            <SeriesTitle size="14" pb={2}>
              {subSeries.title}
            </SeriesTitle>
          </SeriesContainer>
        ))}
    </Box>
  )
}

const SeriesContainer = styled(Box)`
  &:hover {
    z-index: 10;
    color: red;
  }
`

const SeriesTitle = styled(Sans)`
  text-transform: uppercase;
`
