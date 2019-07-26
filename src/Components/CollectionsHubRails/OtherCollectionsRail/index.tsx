import { Box, color, Serif } from "@artsy/palette"
import { OtherCollectionsRail_collectionGroup } from "__generated__/OtherCollectionsRail_collectionGroup.graphql"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup
}
export const OtherCollectionsRail: React.FC<OtherCollectionsRailProps> = ({
  collectionGroup,
}) => {
  const { name, members } = collectionGroup

  return (
    <Container mb={4}>
      <Serif size="5" mx={1} mt={4} mb={2}>
        {name}
      </Serif>

      <Carousel
        height="100px"
        options={{
          groupCells: sd.IS_MOBILE ? 1 : 4,
          cellAlign: "left",
          wrapAround: sd.IS_MOBILE ? true : false,
          pageDots: false,
          draggable: sd.IS_MOBILE ? true : false,
        }}
        data={members}
        render={slide => {
          return <OtherCollectionEntity member={slide} />
        }}
        renderLeftArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              <Arrow />
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          return (
            <ArrowContainer>{members.length > 4 && <Arrow />}</ArrowContainer>
          )
        }}
      />
    </Container>
  )
}

const Container = styled(Box)`
  border: 1px solid ${color("black10")};
  padding-left: 35px;
  padding-right: 35px;
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
