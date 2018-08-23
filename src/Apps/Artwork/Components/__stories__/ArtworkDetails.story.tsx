import { ArtworkDetails } from "Apps/Artwork/Components/ArtworkDetails"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

import { WithBothAboutConditionsAndAdditionalInfo } from "Apps/__test__/Fixtures/Artworks"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Styleguide/Artwork/", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("ArtworkDetails", () => {
    return (
      <React.Fragment>
        <Section title="Artwork with every additional details available">
          <ArtworkDetails
            artwork={WithBothAboutConditionsAndAdditionalInfo as any}
          />
        </Section>
      </React.Fragment>
    )
  })
