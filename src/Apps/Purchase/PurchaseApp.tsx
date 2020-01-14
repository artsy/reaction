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
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { userIsAdmin } from "Utils/user"

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
      <StackableBorderBox
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height="100px"
      >
        <Flex width="350px">
          <Flex height="auto" alignItems="center">
            {artwork.image.url && (
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
}

export const PurchaseApp = (props: Props) => {
  const { orders } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  if (isAdmin) {
    const myOrders = orders.edges.map(x => x.node)
    return (
      <AppContainer>
        <Title>My Orders | Artsy</Title>
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        />
        <SafeAreaContainer>
          <Serif size="5">Purchases</Serif>
          {myOrders.length > 0 &&
            myOrders.map(order => <OrderRow order={order} />)}
          {myOrders.length === 0 && <Sans size="2"> No Orders</Sans>}
        </SafeAreaContainer>
      </AppContainer>
    )
  } else {
    // not an admin
    return <ErrorPage code={404} />
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
