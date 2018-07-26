import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Step, Stepper } from "Styleguide/Components/Stepper"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("Stepper", () => {
  return (
    <React.Fragment>
      <Section title="Artist">
        <Stepper initialTabIndex={1} currentStepIndex={2}>
          <Step name="Review" />
          <Step name="Confirm" />
          <Step name="Pay" />
        </Stepper>
      </Section>
    </React.Fragment>
  )
})
