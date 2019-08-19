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

  return (
    <Content mt={2} py={3}>
      <Serif size="5" mb={1}>
        Trending Artist Series
      </Serif>
      <Carousel
        height="250px"
        options={{
          groupCells: sd.IS_MOBILE ? 1 : broswerWidth > 1024 ? 4 : 3,
          wrapAround: sd.IS_MOBILE ? true : false,
          cellAlign: "left",
          pageDots: false,
          draggable: sd.IS_MOBILE ? true : false,
          contain: true,
        }}
        data={members}
        render={slide => {
          return <ArtistSeriesEntity member={slide} />
        }}
        renderLeftArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              {broswerWidth > 1024 ? (
                members.length > 4 && <Arrow />
              ) : (
                <Arrow showArrow={true} />
              )}
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              {broswerWidth > 1024 ? (
                members.length > 4 && <Arrow />
              ) : (
                <Arrow showArrow={true} />
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
