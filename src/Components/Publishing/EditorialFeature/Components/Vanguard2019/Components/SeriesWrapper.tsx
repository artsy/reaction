import { Box, Flex, Sans, Serif } from "@artsy/palette"
import { Share } from "Components/Publishing/Byline/Share"
import { getFullEditorialHref } from "Components/Publishing/Constants"
import { VanguardVideoSubSeries } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Components/VanguardVideoSubseries"
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
  const { relatedArticles, title, layout, series, slug } = article
  const slugifiedTitle = slugify(title)
  const { hero_section } = props.article
  const url = ((hero_section && hero_section.url) || "") as string
  const isVideo = url.includes("mp4")

  return (
    <Box id={slugifiedTitle} position="relative">
      <Box
        pt={50}
        // prevents overlapping nav on jump-link
      />
      <Box mb={80}>
        <SubSeriesHeaderText mx="auto" maxWidth={1300} px={4}>
          <Numeral size="12">{times(index + 1, () => "I")}</Numeral>
          <Title size="16" textAlign="center" element="h2">
            {title}
          </Title>
        </SubSeriesHeaderText>
        {isVideo && <VanguardVideoSubSeries svg={slugifiedTitle} url={url} />}
      </Box>
      <Box mx="auto" maxWidth="65%" px={4} pb={150}>
        <Flex flexDirection="column" alignItems="center">
          {series && (
            <SubTitle size="12" element="h3" pb={2}>
              {series.sub_title}
            </SubTitle>
          )}
          <Share
            // TODO: We may need to use custom urls here for in-page routing
            url={getFullEditorialHref(layout, slug)}
            title={title}
          />
        </Flex>
      </Box>
      {/** map sub-series artist articles */}
      {relatedArticles &&
        relatedArticles.map((artistArticle, i) => (
          <VanguardArtistWrapper
            key={i}
            article={artistArticle}
            section={slugifiedTitle}
          />
        ))}
    </Box>
  )
}

const SubSeriesHeaderText = styled(Box)`
  position: absolute;
  left: 0;
  top: 50px;
  right: 0;
`

const Title = styled(Sans)`
  text-transform: uppercase;
  text-align: center;
`

const SubTitle = styled(Serif)`
  text-transform: uppercase;
  text-align: center;
`

const Numeral = styled(Serif)`
  position: absolute;
  font-size: 100px;
  line-height: 1em;
`
