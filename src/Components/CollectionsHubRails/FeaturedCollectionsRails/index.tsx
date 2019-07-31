import {
  Box,
  color,
  Flex,
  ReadMore,
  ResponsiveImage,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { FeaturedCollectionsRails_collectionGroup } from "__generated__/FeaturedCollectionsRails_collectionGroup.graphql"
import { StyledLink } from "Apps/Artist/Components/ArtistCollectionsRail/ArtistCollectionEntity"
import { ArrowButton, Carousel } from "Components/v2"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface Props {
  collectionGroup: FeaturedCollectionsRails_collectionGroup
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup,
}) => {
  const { members, name } = collectionGroup
  return (
    <Box>
      <Serif size="5" m={1}>
        {name}
      </Serif>
      <Carousel
        height="500px"
        options={{
          groupCells: 4,
          cellAlign: "left",
          wrapAround: false,
          pageDots: false,
          draggable: false,
        }}
        data={members}
        render={slide => {
          return <FeaturedCollectionEntity member={slide} />
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
      <Spacer pb={4} />
    </Box>
  )
}

interface FeaturedCollectionEntityProps {
  member: any
}

export const FeaturedCollectionEntity: React.FC<
  FeaturedCollectionEntityProps
> = ({ member }) => {
  const { description, price_guidance, slug, thumbnail, title } = member
  return (
    <Container p={2} m={1}>
      <StyledLink href={`/collection/${slug}`}>
        <ImageContainer>
          <FeaturedImage src={thumbnail} />
        </ImageContainer>
        <Serif size="5" mt={1}>
          {title}
        </Serif>
        <Sans size="2" color="black60">{`Starting at $${price_guidance}`}</Sans>
        <ExtendedSerif size="3" mt={1}>
          <ReadMore
            maxChars={100}
            content={
              <>
                {description && (
                  <span dangerouslySetInnerHTML={{ __html: description }} />
                )}
              </>
            }
          />
        </ExtendedSerif>
      </StyledLink>
    </Container>
  )
}

export const FeaturedCollectionsRailsContainer = createFragmentContainer(
  FeaturedCollectionsRails,
  {
    collectionGroup: graphql`
      fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          id
          slug
          title
          description
          price_guidance
          thumbnail
        }
      }
    `,
  }
)

const Container = styled(Box)`
  border: 1px solid ${color("black10")};
  width: 365px;
`

const ImageContainer = styled(Flex)`
  height: 280px;
`

const ExtendedSerif = styled(Serif)`
  div span {
    span p {
      display: inline;
    }

    div p {
      display: inline;
    }
  }
`
export const FeaturedImage = styled(ResponsiveImage)`
  background-position: top;
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
