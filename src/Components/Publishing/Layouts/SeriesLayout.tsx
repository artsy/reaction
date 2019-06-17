import { Box, color } from "@artsy/palette"
import { targetingData } from "Components/Publishing/Display/DisplayTargeting"
import { NewDisplayCanvas } from "Components/Publishing/Display/NewDisplayCanvas"
import { Nav } from "Components/Publishing/Nav/Nav"
import { ArticleCards } from "Components/Publishing/RelatedArticles/ArticleCards/ArticleCards"
import { FixedBackground } from "Components/Publishing/Series/FixedBackground"
import { SeriesAbout } from "Components/Publishing/Series/SeriesAbout"
import {
  SeriesTitle,
  SeriesTitleContainer,
} from "Components/Publishing/Series/SeriesTitle"
import { AdDimension, AdUnit, ArticleData } from "Components/Publishing/Typings"
import { isEditorialSponsored } from "Components/Publishing/utils/Sponsored"
import React, { Component } from "react"
import styled from "styled-components"

interface Props {
  areHostedAdsEnabled?: boolean
  article?: ArticleData
  backgroundColor?: string
  color?: string
  relatedArticles?: any
  isMobile?: boolean
}

export class SeriesLayout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render() {
    const {
      article,
      backgroundColor,
      relatedArticles,
      isMobile,
      areHostedAdsEnabled,
    } = this.props

    const { hero_section, sponsor } = article
    const isSponsored = isEditorialSponsored(sponsor)
    const backgroundUrl =
      hero_section && hero_section.url ? hero_section.url : ""

    return (
      <SeriesContainer
        color={this.props.color}
        backgroundColor={backgroundColor}
      >
        <Nav transparent sponsor={sponsor} canFix={false} />

        <FixedBackground
          backgroundColor={backgroundColor}
          backgroundUrl={backgroundUrl}
        />

        <SeriesContent sponsor={sponsor}>
          <SeriesTitle article={article} color={this.props.color} />

          {relatedArticles && (
            <ArticleCards
              relatedArticles={relatedArticles}
              series={article}
              color={this.props.color}
            />
          )}
          <Box maxWidth={1200} mx="auto" pt={[40, 40, 60]}>
            <SeriesAbout article={article} color={this.props.color} />
          </Box>
        </SeriesContent>
        {areHostedAdsEnabled && (
          <NewDisplayCanvas
            adUnit={
              isMobile
                ? AdUnit.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
                : AdUnit.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
            }
            adDimension={
              isMobile
                ? AdDimension.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
                : AdDimension.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
            }
            displayNewAds={areHostedAdsEnabled}
            targetingData={targetingData(
              article.id,
              isSponsored ? "sponsorlanding" : "standardseries"
            )}
            isSeries
          />
        )}
      </SeriesContainer>
    )
  }
}

SeriesLayout.defaultProps = {
  backgroundColor: color("black100"),
  color: "white",
}

interface ContainerProps {
  backgroundUrl?: string
  sponsor?: any
}

export const SeriesContent = styled.div<Props & ContainerProps>`
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;

  ${SeriesTitleContainer} {
    margin-bottom: ${props => (props.sponsor ? "60px" : "90px")};
  }
`
export const SeriesContainer = styled.div<Props & ContainerProps>`
  color: ${props => props.color};

  ${SeriesContent} {
    padding: 90px 20px 150px;
  }
`
