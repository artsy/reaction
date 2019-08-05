import { Box, Sans } from "@artsy/palette"
import { EditorialFeaturesProps } from "Components/Publishing/EditorialFeature/EditorialFeature"
import { Nav } from "Components/Publishing/Nav/Nav"
import React from "react"
import styled from "styled-components"
import { VanguardIntroduction } from "./Components/Introduction"
import { VanguardSeriesWrapper } from "./Components/SeriesWrapper"
import { VanguardTableOfContents } from "./Components/TableOfContents"

export class Vanguard2019 extends React.Component<EditorialFeaturesProps> {
  render() {
    const { article } = this.props
    const { relatedArticles } = article

    return (
      <Box>
        <Nav
          canFix
          color="black"
          backgroundColor="white"
          title={article.title}
        />
        <FrameTextLeft size="8">2019</FrameTextLeft>
        <FrameTextRight size="8">Vanguard</FrameTextRight>

        {/** header landing video & intro text */}
        <VanguardIntroduction article={article} />
        {/** table of contents */}
        <VanguardTableOfContents article={article} />

        {/** map 3 sub-series articles */}
        {relatedArticles &&
          relatedArticles.map((subSeries, i) => (
            <VanguardSeriesWrapper
              key={subSeries.id}
              article={subSeries}
              index={i}
            />
          ))}
      </Box>
    )
  }
}

const FrameText = styled(Sans)`
  font-size: 100px;
  position: fixed;
  top: 50%;
  text-transform: uppercase;
  transform-origin: center center;
`

const FrameTextLeft = styled(FrameText)`
  left: 0;
  transform: rotate(-90deg);
`
const FrameTextRight = styled(FrameText)`
  right: -150px;
  transform: rotate(90deg);
`
