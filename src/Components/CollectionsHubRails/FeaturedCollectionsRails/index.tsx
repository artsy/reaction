import { Box, color, Flex, ReadMore, Sans, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface Props {
  collectionGroup: any
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup,
}) => {
  const { members } = collectionGroup
  return (
    <Flex flexDirection="row">
      <Serif size="5">{name}</Serif>
      {members.map(({ title, description, price_guidance, thumbnail }) => (
        <Container p={2} m={1}>
          <ImageContainer>
            <img src={thumbnail} />
          </ImageContainer>
          <Serif size="5" mt={1}>
            {title}
          </Serif>
          <Sans
            size="2"
            color="black60"
          >{`Starting at $${price_guidance}`}</Sans>
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
        </Container>
      ))}
    </Flex>
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
  background: ${color("black10")};
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
