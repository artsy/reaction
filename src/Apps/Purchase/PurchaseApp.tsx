import {
  Box,
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
  return (
    <Box p={1}>
      <StackableBorderBox flexDirection="row">
        <Box height="auto">
          {artwork.image.url && (
            <Image src={artwork.image.url} width="55px" mr={1} />
          )}
        </Box>
        <Flex flexDirection="column" style={{ overflow: "hidden" }}>
          <Link
            href={`/orders/${order.internalID}/status`}
            underlineBehavior="hover"
          >
            <Sans size="2">#{order.code}</Sans>
          </Link>
          <Serif size="2" weight="semibold" color="black60">
            {artwork.artist.name}
          </Serif>
          <div style={{ lineHeight: "1" }}>
            <Serif italic size="2" color="black60" display="inline">
              {artwork.title}
            </Serif>
          </div>
          <Serif size="1" style={{ textTransform: "capitalize" }}>
            {order.mode.toLowerCase()} / {order.state.toLowerCase()}
          </Serif>
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
            internalID
            code
            state
            mode
            buyerTotal
            lineItems {
              edges {
                node {
                  artwork {
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
