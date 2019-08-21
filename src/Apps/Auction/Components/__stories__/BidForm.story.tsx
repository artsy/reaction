import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { BidForm } from "../BidForm"

storiesOf("Apps/Auction/Components", module).add("BidForm", () => {
  return (
    <Section>
      <BidForm
        onSubmit={(values, actions) => {
          window.alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }}
      />
    </Section>
  )
})
