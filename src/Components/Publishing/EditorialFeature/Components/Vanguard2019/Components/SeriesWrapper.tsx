import { Box, Flex, Sans, Serif } from "@artsy/palette"
import { Share } from "Components/Publishing/Byline/Share"
import { getFullEditorialHref } from "Components/Publishing/Constants"
import { ArticleData } from "Components/Publishing/Typings"
import { times } from "lodash"
import React from "react"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { VanguardArtistWrapper } from "./ArtistWrapper"

export const VanguardSeriesWrapper: React.SFC<{
  article: ArticleData
  index: number
}> = props => {
  const { article, index } = props
  const { relatedArticles, title, series, hero_section } = article
  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")

  return (
    <Box pb={4} id={slugify(title)}>
      <Box background={url && !isVideo && `url(${url})`}>
        <Box mx="auto" maxWidth={1000} height="70vh">
          {isVideo && (
            <Video src={url} autoPlay controls={false} loop muted playsInline />
          )}
          <Numeral size="8">{times(index + 1, () => "I")}</Numeral>
          <Sans size="8" textAlign="center">
            {title}
          </Sans>
        </Box>
      </Box>
      <Box mx="auto" maxWidth={1000}>
        <Flex pb={4} flexDirection="column" alignItems="center">
          {series && <Serif size="8">{series.sub_title}</Serif>}
          <Share
            // TODO: We may need to use custom urls here for in-page routing
            url={getFullEditorialHref(article.layout, article.slug)}
            title={title}
          />
        </Flex>
      </Box>

      {/** map sub-series artist articles */}
      {relatedArticles &&
        relatedArticles.map((artistArticle, i) => (
          <VanguardArtistWrapper key={i} article={artistArticle} />
        ))}
    </Box>
  )
}

const Numeral = styled(Serif)`
  position: absolute;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
