import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { StripeWrappedRegistrationForm } from "../RegistrationForm"

storiesOf("Apps/Auction/Components", module).add("RegistrationForm", () => {
  return (
    <Section>
      <StripeWrappedRegistrationForm
        onSubmit={(actions, token) => {
          window.alert(JSON.stringify({ token: token.id }, null, 2))
          actions.setSubmitting(false)
        }}
        trackSubmissionErrors={errors =>
          console.warn("Tracking errors: ", errors)
        }
      />
    </Section>
  )
})
