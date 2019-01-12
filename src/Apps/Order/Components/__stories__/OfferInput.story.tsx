import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { OfferInput } from "../OfferInput"

storiesOf("Apps/Order Page/Components", module).add("Offer input", () => (
  <>
    <Section title="With no error">
      <Flex flexDirection="column" width={300} mb={2}>
        <OfferInput id="hello" onChange={() => ({})} />
      </Flex>
    </Section>
    <Section title="With error">
      <Flex flexDirection="column" width={300} mb={2}>
        <OfferInput id="hello" showError onChange={() => ({})} />
      </Flex>
    </Section>
  </>
))
