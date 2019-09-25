import { Box, color, Serif } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "__generated__/ArtistSeriesRail_collectionGroup.graphql"
import { AnalyticsSchema } from "Artsy/Analytics"
import { useTracking } from "Artsy/Analytics/useTracking"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
import { ArtistSeriesRailContainer as ArtistSeriesEntity } from "./ArtistSeriesEntity"

export interface ArtistSeriesRailProps {
  collectionGroup: ArtistSeriesRail_collectionGroup
}
export const ArtistSeriesRail: React.FC<ArtistSeriesRailProps> = ({
  collectionGroup,
}) => {
  const { members } = collectionGroup
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Impression,
      context_page: AnalyticsSchema.PageName.CollectionPage,
      context_module: AnalyticsSchema.ContextModule.ArtistCollectionsRail,
      context_page_owner_type: AnalyticsSchema.OwnerType.Collection,
    })
  }, [])

  const trackArrowClick = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.ArtistCollectionsRail,
      context_page_owner_type: AnalyticsSchema.OwnerType.Collection,
      context_page: AnalyticsSchema.PageName.CollectionPage,
      type: AnalyticsSchema.Type.Button,
      subject: AnalyticsSchema.Subject.ClickedNextButton,
    })
  }

  interface Breakpoints {
    xs?: boolean
    sm?: boolean
    md?: boolean
    xl?: boolean
  }

  const renderCarousel = (breakpoints: Breakpoints = {}) => {
    return (
      <Carousel
        height="250px"
        options={{
          groupCells:
            breakpoints.xs || breakpoints.sm || breakpoints.md ? 1 : 4,
          wrapAround: sd.IS_MOBILE ? true : false,
          cellAlign: "left",
          pageDots: false,
          contain: true,
        }}
        data={members}
        render={(slide, slideIndex) => {
          return <ArtistSeriesEntity member={slide} itemNumber={slideIndex} />
        }}
        renderLeftArrow={({ Arrow }) => {
          const showArrowChecker =
            !breakpoints.xl && members.length <= 4 && !sd.IS_MOBILE
          return (
            <ArrowContainer>
              {members.length > 4 ? (
                <Arrow />
              ) : (
                showArrowChecker && <Arrow showArrow={true} />
              )}
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          const showArrowChecker =
            !breakpoints.xl && members.length <= 4 && !sd.IS_MOBILE
          return (
            <ArrowContainer>
              {members.length > 4 ? (
                <Arrow />
              ) : (
                showArrowChecker && <Arrow showArrow={true} />
              )}
            </ArrowContainer>
          )
        }}
        onArrowClick={() => trackArrowClick()}
      />
    )
  }

  return (
    <Content mt={2} py={3}>
      <Serif size="5" mb={1}>
        Trending Artist Series
      </Serif>
      <Media lessThan="lg">
        {renderCarousel({ xs: true, sm: true, md: true })}
      </Media>
      <Media at="lg">{renderCarousel()}</Media>
      <Media greaterThanOrEqual="xl">{renderCarousel({ xl: true })}</Media>
    </Content>
  )
}

const Content = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

export const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 85%;
  }
`

export const ArtistSeriesRailContainer = createFragmentContainer(
  ArtistSeriesRail,
  {
    collectionGroup: graphql`
      fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
        groupType
        members {
          ...ArtistSeriesEntity_member
        }
      }
    `,
  }
)
