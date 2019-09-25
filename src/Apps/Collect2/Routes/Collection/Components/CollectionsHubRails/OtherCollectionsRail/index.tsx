import { Box, color, Serif } from "@artsy/palette"
import { OtherCollectionsRail_collectionGroup } from "__generated__/OtherCollectionsRail_collectionGroup.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup
}
export const OtherCollectionsRail: React.FC<OtherCollectionsRailProps> = ({
  collectionGroup,
}) => {
  const { name, members } = collectionGroup
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      action_type: Schema.ActionType.Impression,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.OtherCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
    })
  }, [])

  const trackArrowClick = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_module: Schema.ContextModule.OtherCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      context_page: Schema.PageName.CollectionPage,
      type: Schema.Type.Button,
      subject: Schema.Subject.ClickedNextButton,
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
        height="100px"
        options={{
          groupCells:
            breakpoints.xs || breakpoints.sm || breakpoints.md ? 1 : 3,
          wrapAround: sd.IS_MOBILE ? true : false,
          cellAlign: "left",
          pageDots: false,
          contain: true,
        }}
        data={members}
        render={(slide, slideIndex) => {
          return (
            <OtherCollectionEntity member={slide} itemNumber={slideIndex} />
          )
        }}
        renderLeftArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              <Arrow />
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          const shouldDisplayArrow =
            breakpoints.sm || (breakpoints.md && members.length > 3)
          return (
            <ArrowContainer>
              {members.length > 4 ? (
                <Arrow />
              ) : (
                shouldDisplayArrow && <Arrow showArrow={true} />
              )}
            </ArrowContainer>
          )
        }}
        onArrowClick={() => trackArrowClick()}
      />
    )
  }

  return (
    <Container mb={4}>
      <Serif size="5" mt={3} mb={2}>
        {name}
      </Serif>
      <Media lessThan="lg">
        {renderCarousel({ xs: true, sm: true, md: true })}
      </Media>
      <Media at="lg">{renderCarousel()}</Media>
      <Media greaterThanOrEqual="xl">{renderCarousel({ xl: true })}</Media>
    </Container>
  )
}

const Container = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

export const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 60%;
  }
`

export const OtherCollectionsRailsContainer = createFragmentContainer(
  OtherCollectionsRail,
  {
    collectionGroup: graphql`
      fragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          ...OtherCollectionEntity_member
        }
      }
    `,
  }
)
