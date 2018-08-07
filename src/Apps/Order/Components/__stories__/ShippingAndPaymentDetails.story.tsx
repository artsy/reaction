import React from "react"
import { storiesOf } from "storybook/storiesOf"
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
          <ShippingAndPaymentDetails
            address={address}
            creditCardLast4digits="4444"
            creditCardExpiry="04/34"
            creditCardtype="mastercard"
          />
        </Section>
        <Section title="Shipping and Payment details (visa)">
          <ShippingAndPaymentDetails
            address={address}
            creditCardLast4digits="4444"
            creditCardExpiry="04/34"
            creditCardtype="visa"
          />
        </Section>
        <Section title="Shipping and Payment details (generic)">
          <ShippingAndPaymentDetails
            address={address}
            creditCardLast4digits="4444"
            creditCardExpiry="04/34"
            creditCardtype="other"
          />
        </Section>
      </React.Fragment>
    )
  }
)
