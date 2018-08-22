import { ArtworkDetails } from "Apps/Artwork/Components/ArtworkDetails"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

import { WithAllConditionInfo } from "Apps/__test__/Fixtures/Artworks"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Styleguide/Artwork/", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Details", () => {
    return (
      <React.Fragment>
        <Section title="Artwork with every condition info available">
          <ArtworkDetails artwork={WithAllConditionInfo as any} />
        </Section>
      </React.Fragment>
    )
  })
