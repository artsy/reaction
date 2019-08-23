import { Box, color, Serif } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "__generated__/ArtistSeriesRail_collectionGroup.graphql"
import { Carousel } from "Components/v2/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { useWindowSize } from "Utils/Hooks/useWindowSize"
import { ArtistSeriesRailContainer as ArtistSeriesEntity } from "./ArtistSeriesEntity"

export interface ArtistSeriesRailProps {
  collectionGroup: ArtistSeriesRail_collectionGroup
}
export const ArtistSeriesRail: React.FC<ArtistSeriesRailProps> = ({
  collectionGroup,
}) => {
  const { members } = collectionGroup
  const broswerWidth = useWindowSize()

  let groupCells: number

  if (sd.IS_MOBILE) {
    groupCells = 1
  } else {
    if (broswerWidth > 1024) {
      groupCells = 4
    } else groupCells = 3
  }

  const isSmallerViewpoint = broswerWidth < 1024
  return (
    <Content mt={2} py={3}>
      <Serif size="5" mb={1}>
        Trending Artist Series
      </Serif>
      <Carousel
        height="250px"
        options={{
          groupCells,
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
          const smallerViewpointAndFourItems =
            isSmallerViewpoint && members.length === 4
          return (
            <ArrowContainer>
              {members.length > 4 ? (
                <Arrow />
              ) : (
                smallerViewpointAndFourItems && <Arrow showArrow={true} />
              )}
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          const smallerViewpointAndFourItems =
            isSmallerViewpoint && members.length === 4
          return (
            <ArrowContainer>
              {members.length > 4 ? (
                <Arrow />
              ) : (
                smallerViewpointAndFourItems && <Arrow showArrow={true} />
              )}
            </ArrowContainer>
          )
        }}
      />
    </Content>
  )
}

const Content = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

export const ArrowContainer = styled(Box)`
  align-self: flex-start;
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
