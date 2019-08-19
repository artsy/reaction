import { Box, Sans } from "@artsy/palette"
import { EditorialFeaturesProps } from "Components/Publishing/EditorialFeature/EditorialFeature"
import { Nav, NavContainer } from "Components/Publishing/Nav/Nav"
import { last } from "lodash"
import React from "react"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { VanguardIntroduction } from "./Components/Introduction"
import { VanguardSeriesWrapper } from "./Components/SeriesWrapper"
import { VanguardTableOfContents } from "./Components/TableOfContents"

export class Vanguard2019 extends React.Component<EditorialFeaturesProps> {
  public validSlugs

  onChangeSection = slug => {
    const scrollTarget = document.getElementById(slug)
    scrollTarget &&
      scrollTarget.scrollIntoView({
        behavior: "smooth",
      })
  }

  componentDidMount() {
    this.getValidPaths()
    window.addEventListener("load", this.handleScrollOnLoad.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleScrollOnLoad)
  }

  handleScrollOnLoad() {
    const scrollSlugs = window.location.pathname
      .split("/series/artsy-vanguard-2019/")
      .filter(({ length }) => length)
    const scrollToSlug = scrollSlugs.length && last(scrollSlugs)

    if (this.validSlugs.includes(scrollToSlug)) {
      this.onChangeSection(scrollToSlug)
    }
    // remove slug from pathname
    window.history.replaceState({}, "", "/series/artsy-vanguard-2019")
  }

  getValidPaths = () => {
    const validPaths = []

    this.props.article.relatedArticles.forEach(series => {
      // get subSeries slug
      validPaths.push(slugify(series.title))
      series.relatedArticles.map(artist => {
        // get artist slug
        validPaths.push(slugify(artist.title))
      })
    })
    this.validSlugs = validPaths
  }

  render() {
    const { article } = this.props
    const { relatedArticles } = article

    return (
      <VanguardWrapper>
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
      </VanguardWrapper>
    )
  }
}

const VanguardWrapper = styled(Box)`
  ${NavContainer} {
    position: fixed;
  }
`

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
