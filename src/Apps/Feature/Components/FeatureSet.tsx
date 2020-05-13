import React from "react"
import styled from "styled-components"
import { Box, BoxProps, CSSGrid, Sans, color } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureFeaturedLinkFragmentContainer as FeatureFeaturedLink } from "./FeatureFeaturedLink"
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

      <CSSGrid
        mt={2}
        mb={4}
        gridTemplateColumns={[
          "repeat(1fr)",
          `repeat(${Math.min(count, 2)}, 1fr)`,
          `repeat(${Math.min(count, 3)}, 1fr)`,
        ]}
        gridGap={2}
      >
        {set.orderedItems.edges.map(({ node: orderedItem }) => {
          switch (orderedItem.__typename) {
            case "FeaturedLink":
              return (
                <FeatureFeaturedLink
                  key={orderedItem.id}
                  featuredLink={orderedItem}
                />
              )
            default:
              // TODO: Unimplemented: Artist | Artwork | Gene | Sale | PartnerShow | Profile | OrderedSet
              return null
          }
        })}
      </CSSGrid>
    </Container>
  )
}

export const FeatureSetFragmentContainer = createFragmentContainer(FeatureSet, {
  set: graphql`
    fragment FeatureSet_set on OrderedSet {
      name
      description
      itemType
      # TODO: Handle pagination
      orderedItems: orderedItemsConnection(first: 50) {
        edges {
          node {
            __typename
            ... on FeaturedLink {
              id
            }
            ...FeatureFeaturedLink_featuredLink
          }
        }
      }
    }
  `,
})
