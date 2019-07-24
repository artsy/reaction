import {
  Box,
  color,
  Flex,
  ReadMore,
  ResponsiveImage,
  Sans,
  Serif,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface Props {
  collectionGroup: any
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup,
}) => {
  const { members, name } = collectionGroup
  return (
    <>
      <Serif size="5" m={1}>
        {name}
      </Serif>
      <Flex flexDirection="row">
        {members.map(({ title, description, price_guidance, thumbnail }) => (
          <Container p={2} m={1}>
            <ImageContainer>
              <ResponsiveImage src={thumbnail} />
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
    </>
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
