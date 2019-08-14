import { Box, Sans } from "@artsy/palette"
import { EditorialFeaturesProps } from "Components/Publishing/EditorialFeature/EditorialFeature"
import { Nav } from "Components/Publishing/Nav/Nav"
import React from "react"
import styled from "styled-components"
import { VanguardIntroduction } from "./Components/Introduction"
import { VanguardSeriesWrapper } from "./Components/SeriesWrapper"
import { VanguardTableOfContents } from "./Components/TableOfContents"

export class Vanguard2019 extends React.Component<EditorialFeaturesProps> {
  onChangeSection = slug => {
    document.getElementById(slug).scrollIntoView({
      behavior: "smooth",
    })
  }

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
        <FrameTextRight size="16">2019</FrameTextRight>
        <FrameTextLeft size="16">Vanguard</FrameTextLeft>

        {/** header landing video & intro text */}
        <VanguardIntroduction article={article} />
        {/** table of contents */}
        <VanguardTableOfContents
          article={article}
          onChangeSection={this.onChangeSection}
        />

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
  position: fixed;
  top: 50%;
  text-transform: uppercase;
  transform-origin: center center;
  z-index: 2;
`

const FrameTextLeft = styled(FrameText)`
  left: -160px;
  transform: rotate(-90deg);
`
const FrameTextRight = styled(FrameText)`
  right: 0;
  transform: rotate(90deg);
`
