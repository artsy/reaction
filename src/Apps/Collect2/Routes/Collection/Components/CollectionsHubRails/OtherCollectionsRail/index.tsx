import { Box, color, Serif } from "@artsy/palette"
import { OtherCollectionsRail_collectionGroup } from "__generated__/OtherCollectionsRail_collectionGroup.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { useMedia } from "Utils/Hooks/useMedia"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup
}
export const OtherCollectionsRail: React.FC<OtherCollectionsRailProps> = ({
  collectionGroup,
}) => {
  const { name, members } = collectionGroup
  const { trackEvent } = useTracking()
  const { xs, sm, md } = useMedia()

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

  return (
    <Container mb={4}>
      <Serif size="5" mt={3} mb={2}>
        {name}
      </Serif>

      <Carousel
        height="100px"
        options={{
          groupCells: sd.IS_MOBILE ? 1 : 4,
          cellAlign: "left",
          wrapAround: sd.IS_MOBILE ? true : false,
          pageDots: false,
          draggable: xs || sm ? true : false,
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
        onArrowClick={() => trackArrowClick()}
        renderRightArrow={({ Arrow }) => {
          const shouldDisplayArrow = sm || (md && members.length > 3)
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
      />
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

    svg {
      height: 18px;
      width: 18px;
    }
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
