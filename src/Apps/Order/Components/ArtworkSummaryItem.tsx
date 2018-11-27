import { ArtworkSummaryItem_order } from "__generated__/ArtworkSummaryItem_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

import {
  Box,
  Flex,
  FlexProps,
  Image,
  Serif,
  StackableBorderBox,
} from "@artsy/palette"

export interface ArtworkSummaryItemProps extends FlexProps {
  order: ArtworkSummaryItem_order
}

const ArtworkSummaryItem: React.SFC<ArtworkSummaryItemProps> = ({
  order: {
    lineItems,
    seller: { name },
  },
}) => {
  const artwork = get({}, props => lineItems.edges[0].node.artwork)

  const {
    artist_names,
    title,
    date,
    shippingOrigin,
    image: {
      resized_ArtworkSummaryItem: { url: imageURL },
    },
  } = artwork

  const truncateTextStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as any

  return (
    <StackableBorderBox flexDirection="row">
      <Box height="auto">
        <Image src={imageURL} width="55px" mr={1} />
      </Box>
      <Flex flexDirection="column" style={{ overflow: "hidden" }}>
        <Serif
          size="2"
          weight="semibold"
          color="black60"
          style={truncateTextStyle}
        >
          {artist_names}
        </Serif>
        <div style={{ lineHeight: "1", ...truncateTextStyle }}>
          <Serif italic size="2" color="black60" display="inline">
            {title}
          </Serif>
          <Serif size="2" color="black60" display="inline">
            {date && `, ${date}`}
          </Serif>
        </div>
        <Serif size="2" color="black60" style={truncateTextStyle}>
          {name}
        </Serif>
        <Serif size="2" color="black60">
          {shippingOrigin}
        </Serif>
      </Flex>
    </StackableBorderBox>
  )
}

export const ArtworkSummaryItemFragmentContainer = createFragmentContainer(
  ArtworkSummaryItem,
  graphql`
    fragment ArtworkSummaryItem_order on Order {
      seller {
        ... on Partner {
          name
        }
      }
      lineItems {
        edges {
          node {
            artwork {
              artist_names
              title
              date
              shippingOrigin
              image {
                resized_ArtworkSummaryItem: resized(width: 55) {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
)
