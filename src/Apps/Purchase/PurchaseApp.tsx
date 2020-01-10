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
import { PurchaseApp_orders } from "__generated__/PurchaseApp_orders.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

export interface Props {
  orders: PurchaseApp_orders
}

interface OrderRowProps {
  order: any
}
const OrderRow = (props: OrderRowProps) => {
  const { order } = props
  const artwork = order.lineItems.edges[0].node.artwork

  console.log("ORDER", order)
  return (
    <Box p={1}>
      <StackableBorderBox
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height="100px"
      >
        <Flex width="400px">
          <Flex height="auto" alignItems="center">
            {artwork.image.url && (
              <Image src={artwork.image.url} width="55px" mr={1} />
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
                {artwork.artist.name}
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
}

export class PurchaseApp extends React.Component<Props, {}> {
  render() {
    const { orders } = this.props
    return (
      <AppContainer>
        <Title>My Orders | Artsy</Title>
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        />
        <SafeAreaContainer>
          {orders.edges
            .map(x => x.node)
            .map(order => (
              <OrderRow order={order} />
            ))}
        </SafeAreaContainer>
      </AppContainer>
    )
  }
}

const SafeAreaContainer = styled(Box)`
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  margin-bottom: 75px;
`

export const PurchaseAppFragmentContainer = createFragmentContainer(
  PurchaseApp,
  {
    orders: graphql`
      fragment PurchaseApp_orders on CommerceOrderConnectionWithTotalCount {
        edges {
          node {
            stateExpiresAt
            internalID
            code
            state
            mode
            stateReason
            buyerTotal
            lineItems {
              edges {
                node {
                  artwork {
                    date
                    image {
                      url
                    }
                    internalID
                    title
                    artist {
                      name
                    }
                    partner {
                      name
                    }
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
