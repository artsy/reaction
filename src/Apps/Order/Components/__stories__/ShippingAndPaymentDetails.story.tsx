import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"
import { ShippingAndPaymentDetails } from "../ShippingAndPaymentDetails"

const address = `Brian Watterson
401 Broadway, Suite 25
Brooklyn, NY 10011
United States`

storiesOf("App/Order/Components", module).add(
  "ShippingAndPaymentDetails",
  () => {
    return (
      <React.Fragment>
        <Section title="Shipping and Payment details (mastercard)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              address={address}
              creditCardLast4digits="4444"
              creditCardExpiry="04/34"
              creditCardtype="mastercard"
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (visa)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              address={address}
              creditCardLast4digits="4444"
              creditCardExpiry="04/34"
              creditCardtype="visa"
            />
          </Flex>
        </Section>
        <Section title="Shipping and Payment details (generic)">
          <Flex flexDirection="column" width={300}>
            <ShippingAndPaymentDetails
              address={address}
              creditCardLast4digits="4444"
              creditCardExpiry="04/34"
              creditCardtype="other"
            />
          </Flex>
        </Section>
      </React.Fragment>
    )
  }
)
