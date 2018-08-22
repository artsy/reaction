import { ShippingAndPaymentDetails_order } from "__generated__/ShippingAndPaymentDetails_order.graphql"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"
import { ShippingAndPaymentDetails } from "../ShippingAndPaymentDetails"

const order: ShippingAndPaymentDetails_order = {
  " $refType": null,
  fulfillmentType: "SHIP",
  shippingName: "Joelle Van Dyne",
  shippingAddressLine1: "23 41st st",
  shippingAddressLine2: null,
  shippingCity: "New York",
  shippingPostalCode: "90210",
  shippingRegion: "US",
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
  "ShippingAndPaymentDetails",
  () => {
    return (
      <React.Fragment>
        <Section title="Shipping and Payment details (mastercard)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              order={{
                ...order,
                creditCard: { ...order.creditCard, brand: "Mastercard" },
              }}
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (visa)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails order={order} />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (discover)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              order={{
                ...order,
                creditCard: { ...order.creditCard, brand: "Discover" },
              }}
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (amex)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              order={{
                ...order,
                creditCard: { ...order.creditCard, brand: "American Express" },
              }}
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (Unknown)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              order={{
                ...order,
                creditCard: { ...order.creditCard, brand: "Unknown" },
              }}
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (Anything else)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              order={{
                ...order,
                creditCard: { ...order.creditCard, brand: "blasdijf22023" },
              }}
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (pickup, visa)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              order={{
                ...order,
                fulfillmentType: "PICKUP",
              }}
            />
          </Flex>
        </Section>
      </React.Fragment>
    )
  }
)
