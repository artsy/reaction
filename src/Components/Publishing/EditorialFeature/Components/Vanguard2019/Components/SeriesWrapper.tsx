import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { Share } from "Components/Publishing/Byline/Share"
import { getFullEditorialHref } from "Components/Publishing/Constants"
import { VanguardVideoHeader } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Components/VideoHeader"
import { ArticleData } from "Components/Publishing/Typings"
import { times } from "lodash"
import React from "react"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { Media } from "Utils/Responsive"
import { VanguardArtistWrapper } from "./ArtistWrapper"

export const VanguardSeriesWrapper: React.SFC<{
  article: ArticleData
  index: number
  isMobile: boolean
}> = props => {
  const { article, index, isMobile } = props
  const { relatedArticles, title, layout, series, slug } = article
  const slugifiedTitle = slugify(title)
  const { hero_section } = props.article
  const url = ((hero_section && hero_section.url) || "") as string
  const isVideo = url.includes("mp4")

  return (
    <Box id={slugifiedTitle} position="relative">
      <Box
        pt={50}
        background={color("white100")}
        zIndex={-10}
        position="relative"
        // prevents overlapping nav on jump-link
      />
      <Box>
        <SubSeriesHeaderText
          mx="auto"
          maxWidth={["90vw", "80vw", "80vw", 1400]}
          px={4}
        >
          <Media greaterThan="md">
            <LargeNumeral size="12">{times(index + 1, () => "I")}</LargeNumeral>
          </Media>
          <Media lessThan="lg">
            <Numeral size={["8", "12", "12", "12"]}>
              {times(index + 1, () => "I")}
            </Numeral>
          </Media>

          <Title size={["8", "10", "12", "16"]} textAlign="center" element="h2">
            {title}
          </Title>
        </SubSeriesHeaderText>
        {isVideo && <VanguardVideoHeader svg={slugifiedTitle} url={url} />}
      </Box>

      <Box background={color("white100")}>
        <Box
          mx="auto"
          maxWidth={["90vw", "80vw", "80vw", "65%"]}
          px={4}
          pb={150}
          pt={80}
        >
          <Flex flexDirection="column" alignItems="center">
            {series && (
              <SubTitle size={["8", "10", "12", "12"]} element="h3" pb={2}>
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
      </Box>
      {/** map sub-series artist articles */}
      {relatedArticles &&
        relatedArticles.map((artistArticle, i) => (
          <VanguardArtistWrapper
            key={i}
            article={artistArticle}
            section={slugifiedTitle}
            isMobile={isMobile}
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
  mix-blend-mode: difference;
  color: ${color("white100")};
  background: ${color("black100")};
  z-index: -1;
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
  line-height: 1em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  top: 0;
  bottom: 0;
`

const LargeNumeral = styled(Numeral)`
  font-size: 100px;
`
