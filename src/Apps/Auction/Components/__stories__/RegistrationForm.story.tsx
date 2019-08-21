import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { StripeWrappedRegistrationForm } from "../RegistrationForm"

storiesOf("Apps/Auction/Components", module).add("RegistrationForm", () => {
  return (
    <Section>
      <StripeWrappedRegistrationForm
        onSubmit={(values, actions, token) => {
          window.alert(JSON.stringify({ ...values, token: token.id }, null, 2))
          actions.setSubmitting(false)
        }}
      />
    </Section>
  )
})
