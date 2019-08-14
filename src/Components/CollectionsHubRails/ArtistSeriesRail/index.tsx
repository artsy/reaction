import { Box, color, Serif } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "__generated__/ArtistSeriesRail_collectionGroup.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
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
      action_type: Schema.ActionType.Impression,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.ArtistCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
    })
  }, [])

  const trackArrowClick = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_module: Schema.ContextModule.ArtistCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      context_page: Schema.PageName.CollectionPage,
      type: Schema.Type.Button,
      subject: Schema.Subject.ClickedNextButton,
    })
  }

  return (
    <Content mb={2} px={2} py={3}>
      <Serif size="5">Trending Artist Series</Serif>
      <Carousel
        height="200px"
        width="500px"
        options={{
          groupCells: sd.IS_MOBILE ? 1 : 4,
          wrapAround: sd.IS_MOBILE ? true : false,
          cellAlign: "left",
          pageDots: false,
          draggable: sd.IS_MOBILE ? true : false,
        }}
        data={members}
        render={slide => {
          return <ArtistSeriesEntity member={slide} />
        }}
        renderLeftArrow={({ Arrow }) => {
          return (
            <ArrowContainer>{members.length > 4 && <Arrow />}</ArrowContainer>
          )
        }}
        onArrowClick={() => trackArrowClick()}
        renderRightArrow={({ Arrow }) => {
          return (
            <ArrowContainer>{members.length > 4 && <Arrow />}</ArrowContainer>
          )
        }}
      />
    </Content>
  )
}

const Content = styled(Box)`
  border: 1px solid ${color("black10")};
`

export const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 60%;
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
