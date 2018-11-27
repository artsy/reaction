import { Flex } from "@artsy/palette"
import { ShippingAddress_ship } from "__generated__/ShippingAddress_ship.graphql"
import { ShippingSummaryItem_order } from "__generated__/ShippingSummaryItem_order.graphql"
import { mockResolver } from "Apps/__tests__/Fixtures/Order"
import { MockRelayRenderer } from "DevTools/MockRelayRenderer"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ShippingSummaryItemFragmentContainer } from "../ShippingSummaryItem"

// define this separately to be able to type-check it
const ship: ShippingAddress_ship = {
  " $refType": null,
  name: "Joelle Van Dyne",
  addressLine1: "401 Broadway",
  addressLine2: "Suite 25",
  city: "New York",
  postalCode: "10013",
  phoneNumber: "+33 23409220",
  region: "NY",
  country: "US",
}

const order: ShippingSummaryItem_order = {
  " $refType": null,
  state: "PENDING",
  requestedFulfillment: {
    __typename: "Ship",
    ...ship,
  } as any,
  lineItems: {
    edges: [{ node: { artwork: { shippingOrigin: "Jersey City, NJ" } } }],
  },
}

const orderQuery = graphql`
  query ShippingSummaryItemStoryQuery {
    order: ecommerceOrder(id: "foo") {
      ...ShippingSummaryItem_order
    }
  }
`

storiesOf("Apps/Order Page/Components", module).add(
  "ShippingSummaryItem",
  () => (
    <>
      <Section title="Shipping Summary (delivery)">
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={ShippingSummaryItemFragmentContainer}
            mockResolvers={mockResolver(order)}
            query={orderQuery}
          />
        </Flex>
      </Section>
      <Section title="Shipping Summary (pickup)">
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={ShippingSummaryItemFragmentContainer}
            mockResolvers={mockResolver({
              ...order,
              requestedFulfillment: {
                __typename: "Pickup",
              },
            })}
            query={orderQuery}
          />
        </Flex>
      </Section>
      <Section title="Shipping Review (delivery)">
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={(props: any) => (
              <ShippingSummaryItemFragmentContainer
                {...props}
                onChange={() => alert("clicked")}
              />
            )}
            mockResolvers={mockResolver(order)}
            query={orderQuery}
          />
        </Flex>
      </Section>
      <Section title="Shipping Review (pickup)">
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={(props: any) => (
              <ShippingSummaryItemFragmentContainer
                {...props}
                onChange={() => alert("clicked")}
              />
            )}
            mockResolvers={mockResolver({
              ...order,
              requestedFulfillment: {
                __typename: "Pickup",
              },
            })}
            query={orderQuery}
          />
        </Flex>
      </Section>
      <Section title="Shipping Review (locked)">
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={(props: any) => (
              <ShippingSummaryItemFragmentContainer
                {...props}
                locked
                onChange={() => alert("clicked")}
              />
            )}
            mockResolvers={mockResolver(order)}
            query={orderQuery}
          />
        </Flex>
      </Section>
    </>
  )
)
