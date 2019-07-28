import { Box, Sans } from "@artsy/palette"
import { EditorialFeaturesProps } from "Components/Publishing/EditorialFeature/EditorialFeature"
import { Nav } from "Components/Publishing/Nav/Nav"
import React from "react"
import styled from "styled-components"
import { VanguardIntroduction } from "./Components/Introduction"
import { VanguardSeriesWrapper } from "./Components/SeriesWrapper"
import { VanguardTOC } from "./Components/TOC"

export class Vanguard2019 extends React.Component<EditorialFeaturesProps> {
  render() {
    const { article } = this.props
    const { relatedArticles } = article

    return (
      <Box>
        <Nav
          canFix={false}
          color="black"
          backgroundColor="white"
          title={article.title}
        />

        <FrameTextLeft size="8">Vanguard</FrameTextLeft>
        <FrameTextRight size="8">2019</FrameTextRight>
        <VanguardIntroduction article={article} />
        {/** table of contents */}
        <VanguardTOC article={article} />
        {/** map 3 sub-series articles */}
        {relatedArticles &&
          relatedArticles.map(subSeries => (
            <VanguardSeriesWrapper key={subSeries.id} article={subSeries} />
          ))}
      </Box>
    )
  }
}

const FrameText = styled(Sans)`
  position: fixed;
  top: 50%;
  font-size: 100px;
  height: 1em;
  text-transform: uppercase;
  transform-origin: center center;
`

const FrameTextLeft = styled(FrameText)`
  left: -150px;
  transform: rotate(-90deg);
`
const FrameTextRight = styled(FrameText)`
  right: 20px;
  transform: rotate(90deg);
`
