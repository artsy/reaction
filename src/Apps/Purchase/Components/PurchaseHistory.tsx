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

interface OrderRowProps {
  order: any
}
const OrderRow = (props: OrderRowProps) => {
  const { order } = props
  const artwork = order.lineItems.edges[0].node.artwork

  return (
    artwork && (
      <Box p={1}>
        <StackableBorderBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex width="350px">
            <Flex height="auto" alignItems="center">
              {artwork.image.resized.url && (
                <Image src={artwork.image.resized.url} width="55px" mr={1} />
              )}
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="center"
              style={{ overflow: "hidden" }}
            >
              <Link
                href={`/orders/${order.internalID}/status`}
                underlineBehavior="hover"
              >
                <Serif size="2" weight="semibold">
                  {artwork.artist_names}
                </Serif>
              </Link>
              <div style={{ lineHeight: "1" }}>
                <Serif italic size="2" color="black60" display="inline">
                  {artwork.title}, {artwork.date}
                </Serif>
              </div>
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
  )
}

interface PurchaseHistoryProps {
  orders: PurchaseHistory_orders
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = (
  props: PurchaseHistoryProps
) => {
  const { orders } = props
  const myOrders = orders.edges.map(x => x.node)
  return (
    <>
      <Serif size="5">Purchases</Serif>
      {myOrders.length > 0 &&
        myOrders.map(order => <OrderRow key={order.code} order={order} />)}
      {myOrders.length === 0 && <Sans size="2"> No Orders</Sans>}
    </>
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
                      resized {
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
