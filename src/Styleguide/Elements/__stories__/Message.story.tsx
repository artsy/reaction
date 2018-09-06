import { Box, Spacer } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Message } from "Styleguide/Elements/Message"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Message", () => {
  return (
    <>
      <Section title="Message">
        <Message>
          Thank you for your order. You’ll receive a confirmation email shortly.
          If you have questions, please contact <a href="#">orders@artsy.net</a>.
        </Message>
      </Section>

      <Section title="Various sizes">
        <Box width="50%">
          <Message size="2">
            Thank you for your order. You’ll receive a confirmation email
            shortly. If you have questions, please contact{" "}
            <a href="#">orders@artsy.net</a>.
          </Message>

          <Spacer my={1} />

          <Message size="3">
            Thank you for your order. You’ll receive a confirmation email
            shortly. If you have questions, please contact{" "}
            <a href="#">orders@artsy.net</a>.
          </Message>

          <Spacer my={1} />

          <Message size="4">
            Thank you for your order. You’ll receive a confirmation email
            shortly. If you have questions, please contact{" "}
            <a href="#">orders@artsy.net</a>.
          </Message>

          <Spacer my={1} />

          <Message size="5">
            Thank you for your order. You’ll receive a confirmation email
            shortly. If you have questions, please contact{" "}
            <a href="#">orders@artsy.net</a>.
          </Message>
        </Box>
      </Section>
    </>
  )
})
