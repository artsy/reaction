import { Box, color, Flex, ReadMore, Sans, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeaturedCollectionsRails_marketingCollection } from "src/__generated__/FeaturedCollectionsRails_marketingCollection.graphql"
import styled from "styled-components"

interface Props {
  marketingCollection: FeaturedCollectionsRails_marketingCollection
}

const railForGroupType = (groupType, members) => {
  switch (groupType) {
    case "FeaturedCollections":
      return (
        <Flex flexDirection="row">
          {members.map(({ title, description, price_guidance }) => (
            <Container p={2} m={1}>
              <ImageContainer>
                <img src="" />
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
                        <span
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      )}
                    </>
                  }
                />
              </ExtendedSerif>
            </Container>
          ))}
        </Flex>
      )
    default:
      return null
  }
}

export const FeaturedCollectionsRails = createFragmentContainer(
  ({ marketingCollection }: Props) => {
    const { linkedCollections } = marketingCollection

    return linkedCollections.map(({ groupType, name, members }) => (
      <div>
        <Serif size="5">{name}</Serif>
        {railForGroupType(groupType, members)}
      </div>
    ))
  },
  {
    marketingCollection: graphql`
      fragment FeaturedCollectionsRails_marketingCollection on MarketingCollection {
        linkedCollections {
          groupType
          name
          members {
            id
            slug
            title
            description
            price_guidance
          }
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
