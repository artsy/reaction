import { Box, color, Serif } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "__generated__/ArtistSeriesRail_collectionGroup.graphql"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import React from "react"
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
  const broswerWidth = GetBroswerWidth()

  return (
    <Content mt={2} py={3}>
      <Serif size="5" mb={1}>
        Trending Artist Series
      </Serif>
      <Carousel
        height="250px"
        options={{
          groupCells: sd.IS_MOBILE ? 1 : broswerWidth > 1024 ? 4 : 1,
          wrapAround: sd.IS_MOBILE ? true : broswerWidth > 1024 ? false : true,
          // wrapAround: sd.IS_MOBILE ? true : false,
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
                <Arrow />
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
                <Arrow />
              )}
            </ArrowContainer>
          )
        }}
      />
    </Content>
  )
}

export const GetBroswerWidth = () => {
  let width: number
  try {
    width = window.innerWidth
  } catch (e) {
    width = 0
  }
  return width
}

const Content = styled(Box)`
  border-top: 1px solid ${color("black10")};
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
