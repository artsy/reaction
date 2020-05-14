import React from "react"
import styled from "styled-components"
import { Box, BoxProps, CSSGrid, Sans, color } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureFeaturedLinkFragmentContainer as FeatureFeaturedLink } from "./FeatureFeaturedLink"
import GridItem from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { FeatureSet_set } from "__generated__/FeatureSet_set.graphql"

const Container = styled(Box)`
  border-top: 1px solid ${color("black100")};
  border-bottom: 1px solid ${color("black100")};

  & + & {
    margin-top: -1px;
  }

  &:last-of-type {
    border-bottom: 0;
  }
`

export interface FeatureSetProps extends Omit<BoxProps, "color"> {
  set: FeatureSet_set
}

export const FeatureSet: React.FC<FeatureSetProps> = ({ set, ...rest }) => {
  const count = set.orderedItems.edges.length

  return (
    <Container {...rest}>
      {(set.name || set.description) && (
        <Box mt={4} mb={2}>
          {set.name && (
            <Sans size="6" color="black100">
              {set.name}
            </Sans>
          )}

          {set.description && (
            <Sans size="3" color="black60">
              {set.description}
            </Sans>
          )}
        </Box>
      )}

      {(() => {
        switch (set.itemType) {
          case "FeaturedLink":
            return (
              <CSSGrid
                key={set.id}
                mt={2}
                mb={4}
                gridTemplateColumns={[
                  "repeat(1fr)",
                  `repeat(${Math.min(count, 2)}, 1fr)`,
                  `repeat(${Math.min(count, 3)}, 1fr)`,
                ]}
                gridGap={2}
              >
                {set.orderedItems.edges.map(({ node }) => {
                  if (!node || node.__typename !== "FeaturedLink") {
                    return null
                  }

                  return (
                    <FeatureFeaturedLink key={node.id} featuredLink={node} />
                  )
                })}
              </CSSGrid>
            )

          case "Artwork":
            return (
              <Masonry
                key={set.id}
                columnCount={[Math.min(count, 2), Math.min(count, 3)]}
                gridColumnGap={20}
              >
                {set.orderedItems.edges.map(({ node }) => {
                  if (!node || node.__typename !== "Artwork") {
                    return null
                  }

                  return (
                    <Box key={node.id} pb={2} maxWidth={400} mx="auto">
                      <GridItem artwork={node} />
                    </Box>
                  )
                })}
              </Masonry>
            )
          default:
            console.warn(
              "Feature pages only support FeaturedLinks and Artworks"
            )

            return null
        }
      })()}
    </Container>
  )
}

export const FeatureSetFragmentContainer = createFragmentContainer(FeatureSet, {
  set: graphql`
    fragment FeatureSet_set on OrderedSet {
      id
      name
      description
      itemType
      # TODO: Handle pagination
      orderedItems: orderedItemsConnection(first: 20) {
        edges {
          node {
            __typename
            ... on FeaturedLink {
              id
            }
            ... on Artwork {
              id
            }
            ...GridItem_artwork
            ...FeatureFeaturedLink_featuredLink
          }
        }
      }
    }
  `,
})
