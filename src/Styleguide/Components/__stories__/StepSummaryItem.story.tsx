import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import { Section } from "Styleguide/Utils/Section"
import { Responsive } from "Utils/Responsive"

storiesOf("Styleguide/Components", module).add("StepSummaryItem", () => {
  return (
    <>
      <Section title="Single StepSummaryItem">
        <StepSummaryItem
          title="Pick up (New York, NY)"
          onChange={() => console.warn("change")}
          width="100%"
          maxWidth={542}
        >
          <Sans size="2" color="black60" maxWidth={391}>
            After you place your order, you’ll be appointed an Artsy specialist
            within 2 business days to handle pickup logistics.
          </Sans>
        </StepSummaryItem>
      </Section>
      <Section title="Multiple StepSummaryItems">
        <StepSummaryItem
          title="Pick up (New York, NY)"
          onChange={() => console.warn("change")}
          width="100%"
          maxWidth={542}
        >
          <Sans size="2" color="black60" maxWidth={391}>
            After you place your order, you’ll be appointed an Artsy specialist
            within 2 business days to handle pickup logistics.
          </Sans>
        </StepSummaryItem>
        <StepSummaryItem
          title="Shipping Address"
          onChange={() => console.warn("change")}
          width="100%"
          maxWidth={542}
        >
          <Responsive>
            {({ xs }) => (
              <Serif size={xs ? "2" : "3"} color="black100">
                Ebe Park<br />
                315 8th Ave, Apt 5C<br />
                New York, NY 10001<br />
                United States
              </Serif>
            )}
          </Responsive>
        </StepSummaryItem>
      </Section>
    </>
  )
})
