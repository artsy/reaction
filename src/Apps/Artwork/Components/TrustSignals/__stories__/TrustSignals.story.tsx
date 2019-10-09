import { SecurePayment_artwork } from "__generated__/SecurePayment_artwork.graphql"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { SecurePayment } from "../SecurePayment"

storiesOf("Apps/Artwork/Components", module).add("Trust Signals", () => {
  return (
    <Section title="Secure Payment">
      <SecurePayment
        artwork={
          {
            is_acquireable: true,
            is_offerable: true,
          } as SecurePayment_artwork
        }
      />
    </Section>
  )
})
