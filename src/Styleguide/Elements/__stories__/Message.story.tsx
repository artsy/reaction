import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Message } from "Styleguide/Elements/Message"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Message", () => {
  return (
    <Section title="Message">
      <Message>
        Thank you for your order. You’ll receive a confirmation email shortly.
        If you have questions, please contact <a href="#">orders@artsy.net</a>.
      </Message>
    </Section>
  )
})
