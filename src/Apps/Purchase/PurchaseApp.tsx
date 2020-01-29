import { PurchaseApp_orders } from "__generated__/PurchaseApp_orders.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { userIsAdmin } from "Utils/user"
import { PurchaseHistoryFragmentContainer as PurchaseHistory } from "./Components/PurchaseHistory"

export interface PurchaseAppProps {
  orders: PurchaseApp_orders
}

export const PurchaseApp = (props: any) => {
  console.log("props", props, props.orders)
  const { orders } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  if (isAdmin) {
    return (
      <AppContainer>
        <Title>My Orders | Artsy</Title>
        <PurchaseHistory orders={orders} />
      </AppContainer>
    )
  } else {
    // not an admin
    return <ErrorPage code={404} />
  }
}

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
