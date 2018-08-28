import { ShippingAndPaymentReview_order } from "__generated__/ShippingAndPaymentReview_order.graphql"
import { ShippingAndPaymentSummary_order } from "__generated__/ShippingAndPaymentSummary_order.graphql"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"
import { CreditCardDetails } from "../CreditCardDetails"
import { ShippingAndPaymentReview } from "../ShippingAndPaymentReview"
import { ShippingAndPaymentSummary } from "../ShippingAndPaymentSummary"

const order: ShippingAndPaymentReview_order &
  ShippingAndPaymentSummary_order = {
  " $refType": null,
  requestedFulfillment: {
    name: "Joelle Van Dyne",
    addressLine1: "23 41st st",
    addressLine2: null,
    city: "New York",
    postalCode: "90210",
    region: "US",
  },
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

storiesOf("Apps/Order Page/Components", module).add(
  "ShippingAndPaymentSummary",
  () => {
    return (
      <React.Fragment>
        <Section title="Shipping and Payment Summary">
          <h4>Delivery</h4>
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentSummary order={order} />
          </Flex>
          <h4>Pickup</h4>
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentSummary
              order={{
                ...order,
                requestedFulfillment: {
                  fulfillmentType: "PICKUP",
                },
              }}
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment Review">
          <h4>Delivery</h4>
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentReview
              onChangePayment={() => alert("clicked")}
              onChangeShipping={() => alert("clicked")}
              order={order}
            />
          </Flex>
          <h4>Pickup</h4>
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentReview
              onChangePayment={() => alert("clicked")}
              onChangeShipping={() => alert("clicked")}
              order={{
                ...order,
                requestedFulfillment: {
                  fulfillmentType: "PICKUP",
                },
              }}
            />
          </Flex>
        </Section>
        <Section title="Credit card details">
          <Flex flexDirection="column" width={300} mb={2}>
            <CreditCardDetails {...order.creditCard} brand="Visa" />
          </Flex>
          <Flex flexDirection="column" width={300} mb={2}>
            <CreditCardDetails {...order.creditCard} brand="Mastercard" />
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
      </React.Fragment>
    )
  }
)
