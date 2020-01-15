import { Box } from "@artsy/palette"
import { PurchaseApp_orders } from "__generated__/PurchaseApp_orders.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { userIsAdmin } from "Utils/user"
import { PurchaseHistoryFragmentContainer as PurchaseHistory } from "./Components/PurchaseHistory"

export interface Props {
  orders: PurchaseApp_orders
}

export const PurchaseApp = (props: Props) => {
  const { orders } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  if (isAdmin) {
    return (
      <AppContainer>
        <Title>My Orders | Artsy</Title>
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        />
        <SafeAreaContainer>
          <PurchaseHistory orders={orders} />
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
        ...PurchaseHistory_orders
      }
    `,
  }
)
