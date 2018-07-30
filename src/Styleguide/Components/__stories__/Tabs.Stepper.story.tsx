import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Step, Stepper } from "Styleguide/Components/Stepper"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("Stepper", () => {
  return (
    <React.Fragment>
      <Section title="Stepper (1st step)">
        <Stepper
          initialTabIndex={0}
          currentStepIndex={0}
          onChange={activeTab => {
            // tslint:disable-next-line
            console.log(activeTab)
          }}
        >
          <Step name="Review" />
          <Step name="Confirm" />
          <Step name="Pay" />
        </Stepper>
      </Section>
      <Section title="Stepper (2nd step)">
        <Stepper
          initialTabIndex={1}
          currentStepIndex={1}
          onChange={activeTab => {
            // tslint:disable-next-line
            console.log(activeTab)
          }}
        >
          <Step name="Review" />
          <Step name="Confirm" />
          <Step name="Pay" />
        </Stepper>
      </Section>
      <Section title="Stepper (all steps done currently on second)">
        <Stepper
          initialTabIndex={1}
          currentStepIndex={3}
          onChange={activeTab => {
            // tslint:disable-next-line
            console.log(activeTab)
          }}
        >
          <Step name="Review" />
          <Step name="Confirm" />
          <Step name="Pay" />
        </Stepper>
      </Section>
      <Section title="Stepper (disabled navigation)">
        <Stepper initialTabIndex={1} currentStepIndex={2} disableNavigation>
          <Step name="Review" />
          <Step name="Confirm" />
          <Step name="Pay" />
        </Stepper>
      </Section>{" "}
    </React.Fragment>
  )
})
