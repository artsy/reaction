import { Box, Sans, Serif } from "@artsy/palette"
import { Share } from "Components/Publishing/Byline/Share"
import { getFullEditorialHref } from "Components/Publishing/Constants"
import { Sections } from "Components/Publishing/Sections/Sections"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

export const VanguardArtistWrapper: React.SFC<{
  article: ArticleData
}> = props => {
  const { article } = props
  const { hero_section, title } = article
  return (
    <Box pb={4} maxWidth={1000} mx="auto">
      <Box textAlign="center">
        <ArtistTitle size="8">{title}</ArtistTitle>
        <Box position="absolute">
          <Share
            // TODO: We may need to use custom urls here for in-page routing
            url={getFullEditorialHref(article.layout, article.slug)}
            title={title}
          />
        </Box>
        {hero_section && (
          <Sans size="4" weight="medium">
            {hero_section.deck}
          </Sans>
        )}
      </Box>
      <Sections article={article} />
    </Box>
  )
}

const ArtistTitle = styled(Serif)`
  font-size: 100px;
  line-height: 1.35em;
`
