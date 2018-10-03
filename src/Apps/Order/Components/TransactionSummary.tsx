import { TransactionSummary_order } from "__generated__/TransactionSummary_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import {
  Box,
  Flex,
  FlexProps,
  Image,
  Serif,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"

export interface TransactionSummaryProps extends FlexProps {
  order: TransactionSummary_order
}

export const TransactionSummary: React.SFC<TransactionSummaryProps> = ({
  order: {
    itemsTotal,
    taxTotal,
    shippingTotal,
    buyerTotal,
    lineItems,
    seller: { name },
  },
  ...others
}) => {
  const {
    artist_names,
    title,
    date,
    shippingOrigin,
    image: {
      resized_transactionSummary: { url: imageURL },
    },
  } = lineItems.edges[0].node.artwork
  const truncateTextStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as any

  return (
    <Flex flexDirection="column" {...others}>
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
          <div
            style={{
              lineHeight: "1",
              ...truncateTextStyle,
            }}
          >
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
      <StackableBorderBox flexDirection="column">
        <Entry label="Price" value={itemsTotal} />
        <Entry label="Shipping" value={shippingTotal || "—"} />
        <Entry label="Tax" value={taxTotal || "—"} />
        <Spacer mb={2} />
        <Entry label="Total" value={buyerTotal} final />
      </StackableBorderBox>
    </Flex>
  )
}

const Entry = ({
  label,
  value,
  final,
}: {
  label: React.ReactNode
  value: React.ReactNode
  final?: boolean
}) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Serif size="2" color="black60">
        {label}
      </Serif>
    </div>
    <div>
      <Serif
        size="2"
        color={final ? "black100" : "black60"}
        weight={final ? "semibold" : "regular"}
      >
        {value}
      </Serif>
    </div>
  </Flex>
)

export const TransactionSummaryFragmentContainer = createFragmentContainer(
  TransactionSummary,
  graphql`
    fragment TransactionSummary_order on Order {
      shippingTotal(precision: 2)
      taxTotal(precision: 2)
      itemsTotal(precision: 2)
      buyerTotal(precision: 2)
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
                resized_transactionSummary: resized(width: 55) {
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
