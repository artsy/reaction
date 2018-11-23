import { Flex } from "@artsy/palette"
import { ShippingAddress_ship } from "__generated__/ShippingAddress_ship.graphql"
import { ShippingAndPaymentReview_order } from "__generated__/ShippingAndPaymentReview_order.graphql"
import { ShippingAndPaymentSummary_order } from "__generated__/ShippingAndPaymentSummary_order.graphql"
import { MockRelayRenderer } from "DevTools/MockRelayRenderer"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { CreditCardDetails } from "../CreditCardDetails"
import { ShippingAndPaymentReviewFragmentContainer as ShippingAndPaymentReview } from "../ShippingAndPaymentReview"
import { ShippingAndPaymentSummaryFragmentContainer as ShippingAndPaymentSummary } from "../ShippingAndPaymentSummary"

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

const order: ShippingAndPaymentReview_order &
  ShippingAndPaymentSummary_order = {
  " $refType": null,
  state: "PENDING",
  mode: "BUY",
  itemsTotal: "$10,000",
  totalListPrice: "$10,000",
  requestedFulfillment: {
    __typename: "Ship",
    ...ship,
  } as any,
  lineItems: {
    edges: [{ node: { artwork: { shippingOrigin: "Jersey City, NJ" } } }],
  },
  creditCard: {
    brand: "Visa",
    last_digits: "4444",
    expiration_month: 3,
    expiration_year: 21,
  },
}

const orderQuery = graphql`
  query ShippingAndPaymentDetailsQuery {
    order: ecommerceOrder(id: "foo") {
      ...ShippingAndPaymentSummary_order
      ...ShippingAndPaymentReview_order
    }
  }
`

storiesOf("Apps/Order Page/Components", module).add(
  "ShippingAndPaymentSummary",
  () => (
    <>
      <Section title="Shipping and Payment Summary">
        <h4>Delivery</h4>
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={ShippingAndPaymentSummary}
            mockResolvers={{
              Order: () => order,
            }}
            query={orderQuery}
          />
        </Flex>
      </Section>

      <Section title="Shipping and Payment Review">
        <h4>Delivery</h4>
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={(props: any) => (
              <ShippingAndPaymentReview
                onChangePayment={() => alert("clicked")}
                onChangeShipping={() => alert("clicked")}
                {...props}
              />
            )}
            mockResolvers={{
              Order: () => order,
            }}
            query={orderQuery}
          />
        </Flex>
        <h4>Pickup</h4>
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={(props: any) => (
              <ShippingAndPaymentReview
                onChangePayment={() => alert("clicked")}
                onChangeShipping={() => alert("clicked")}
                {...props}
              />
            )}
            mockResolvers={{
              Order: () => ({
                ...order,
                requestedFulfillment: {
                  __typename: "Pickup",
                },
              }),
            }}
            query={orderQuery}
          />
        </Flex>
        <h4>Offer</h4>
        <Flex flexDirection="column" width={300}>
          <MockRelayRenderer
            Component={(props: any) => (
              <ShippingAndPaymentReview
                onChangePayment={() => alert("clicked")}
                onChangeShipping={() => alert("clicked")}
                onChangeOffer={() => alert("clicked")}
                {...props}
              />
            )}
            mockResolvers={{
              Order: () => ({
                ...order,
                mode: "OFFER",
                requestedFulfillment: {
                  __typename: "Pickup",
                },
              }),
            }}
            query={orderQuery}
          />
        </Flex>
      </Section>
      <Section title="Credit card details">
        <Flex flexDirection="column" width={300} mb={2}>
          <CreditCardDetails {...order.creditCard} brand="Visa" />
        </Flex>
        <Flex flexDirection="column" width={300} mb={2}>
          <CreditCardDetails {...order.creditCard} brand="MasterCard" />
        </Flex>
        <Flex flexDirection="column" width={300} mb={2}>
          <CreditCardDetails {...order.creditCard} brand="Discover" />
        </Flex>
        <Flex flexDirection="column" width={300} mb={2}>
          <CreditCardDetails {...order.creditCard} brand="American Express" />
        </Flex>
        <Flex flexDirection="column" width={300}>
          <CreditCardDetails {...order.creditCard} brand="unknown" />
        </Flex>
      </Section>
    </>
  )
)
