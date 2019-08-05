import { Box, Sans, Serif } from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import { times } from "lodash"
import React from "react"
import styled from "styled-components"
import { slugify } from "underscore.string"
import {
  NewlyEstablished1,
  NewlyEstablished2,
  NewlyEstablished3,
} from "../Assets/NewlyEstablished"

type SubSeriesType = "emerging" | "newly-established" | "getting-their-due"

export const VanguardTableOfContents: React.SFC<{
  article: ArticleData
  onChangeSection: (slug: string) => void
}> = props => {
  const {
    article: { relatedArticles },
    onChangeSection,
  } = props

  return (
    <Box pb={100} textAlign="center" minHeight="70vh">
      <Sans size={["8", "12", "14", "16"]} mb={4}>
        Table of Contents
      </Sans>

      {relatedArticles &&
        relatedArticles.map((subSeries, i) => {
          const subSeriesSlug = slugify(subSeries.title) as SubSeriesType
          return (
            <SeriesContainer
              key={i}
              onClick={() => onChangeSection(subSeriesSlug)}
            >
              <SvgContainer>{TocSvgs(subSeriesSlug)}</SvgContainer>
              <Chapter>
                <Serif
                  size={["8", "10", "12", "12"]}
                  pb={2}
                  maxWidth={1000}
                  mx="auto"
                >
                  {times(i + 1, () => "I")}
                </Serif>
                <SeriesTitle
                  size={["8", "10", "12", "14"]}
                  pb={2}
                  maxWidth={1000}
                  mx="auto"
                >
                  {subSeries.title}
                </SeriesTitle>
              </Chapter>
            </SeriesContainer>
          )
        })}
    </Box>
  )
}

export const TocSvgs = (type: SubSeriesType) => {
  // TODO: Update with emerging/getting due SVGs
  switch (type) {
    case "emerging":
      return <NewlyEstablished2 />
    case "newly-established":
      return <NewlyEstablished1 />
    case "getting-their-due":
      return <NewlyEstablished3 />
  }
}

const Chapter = styled(Box)`
  position: relative;
`

const SvgContainer = styled(Box)`
  position: absolute;
  left: 0;
  top: -50%;
  right: 0;
  bottom: auto;
  display: none;
`

const SeriesTitle = styled(Sans)`
  text-transform: uppercase;
`

const SeriesContainer = styled(Box)`
  position: relative;

  &:hover {
    ${SvgContainer} {
      display: block;
    }

    ${Chapter} {
      color: white;
      cursor: pointer;
    }
  }
`
