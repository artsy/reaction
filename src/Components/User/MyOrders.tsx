import { Box, Serif, Theme } from "@artsy/palette"
import { SystemContext, SystemContextProps } from "Artsy"
import { get } from "Utils/get"

import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"

interface MyOrdersPaymentsProps extends SystemContextProps {
  relay?: RelayProp
  myOrders: MyOrders_me
}

export class MyOrders extends React.Component<MyOrdersProps> {
  render() {
    const orders = this.props.myOrders.edges.map(({ node: order }) => order)

    return (
      <Theme>
        <>
          {orders && orders.length ? (
            <Box maxWidth={542}> {orders.length} </Box>
          ) : null}
        </>
      </Theme>
    )
  }
}

export const MyOrdersFragmentContainer = createFragmentContainer(MyOrders, {
  me: graphql`
    fragment MyOrders_me on Me {
      id
      internalID
      creditCards(first: 100)
        @connection(key: "MyOrders_creditCards", filters: []) {
        edges {
          node {
            ...MyOrdersCreditCard @relay(mask: false)
          }
        }
      }
    }
  `,
})

export const MyOrdersQueryRenderer = () => {
  const { user, relayEnvironment } = useContext(SystemContext)
  if (!user) {
    return null
  }

  return (
    <QueryRenderer<MyOrdersQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query MyOrdersQuery {
          me {
            ...MyOrders_me
          }
        }
      `}
      render={renderWithLoadProgress(MyOrdersFragmentContainer)}
    />
  )
}
