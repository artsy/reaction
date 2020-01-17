import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Sans,
  Serif,
  StackableBorderBox,
} from "@artsy/palette"
import { PurchaseHistory_orders } from "__generated__/PurchaseHistory_orders.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

interface OrderRowProps {
  order: PurchaseHistory_orders["edges"][number]["node"]
}
const OrderRow = (props: OrderRowProps) => {
  const { order } = props
  const artwork = get(order, o => o.lineItems.edges[0].node.artwork)

  if (!artwork) {
    return null
  }

  return (
    <Box py={1}>
      <StackableBorderBox
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex width="350px">
          <Flex height="auto" alignItems="center" mr={2}>
            <Image src={get(artwork, a => a.image.resized.url)} width="55px" />
          </Flex>
          <Flex flexDirection="column" justifyContent="center">
            <Link
              href={`/orders/${order.internalID}/status`}
              underlineBehavior="hover"
            >
              <Serif size="2" weight="semibold">
                {artwork.artist_names}
              </Serif>
            </Link>
            <Serif italic size="2" color="black60" lineHeight={1.3}>
              {artwork.title}, {artwork.date}
            </Serif>
          </Flex>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Sans
            size="2"
            weight="medium"
            style={{ textTransform: "capitalize" }}
          >
            {order.mode.toLowerCase()}
          </Sans>
          <Sans
            size="2"
            color="black60"
            style={{ textTransform: "capitalize" }}
          >
            {order.state.toLowerCase()}
          </Sans>
        </Flex>
        <Flex>
          <Link
            href={`/orders/${order.internalID}/status`}
            underlineBehavior="hover"
          >
            <Button variant="secondaryGray">View details</Button>
          </Link>
        </Flex>
      </StackableBorderBox>
    </Box>
  )
}

interface PurchaseHistoryProps {
  orders: PurchaseHistory_orders
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = (
  props: PurchaseHistoryProps
) => {
  const { orders } = props
  const myOrders = orders.edges && orders.edges.map(x => x.node)
  return (
    <Box px={1}>
      <Serif size="5">Purchases</Serif>
      {myOrders.length ? (
        myOrders.map(order => <OrderRow key={order.code} order={order} />)
      ) : (
        <Sans size="2">No Orders</Sans>
      )}
    </Box>
  )
}

export const PurchaseHistoryFragmentContainer = createFragmentContainer(
  PurchaseHistory,
  {
    orders: graphql`
      fragment PurchaseHistory_orders on CommerceOrderConnectionWithTotalCount {
        edges {
          node {
            internalID
            code
            state
            mode
            buyerTotal
            lineItems {
              edges {
                node {
                  artwork {
                    date
                    image {
                      resized(width: 55) {
                        url
                      }
                    }
                    internalID
                    title
                    artist_names: artistNames
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
