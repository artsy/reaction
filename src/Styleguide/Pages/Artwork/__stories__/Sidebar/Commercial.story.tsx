import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Commercial } from "../../Sidebar/Commercial"
import {
  FoSaleArtworkNoEditions,
  FoSaleArtworkWithOneEdition,
  FoSaleArtworkWithMultipleEditions,
  ContactForPriceWork,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/Commercial"

storiesOf("Styleguide/Artwork/Sidebar", module).add("Commercial", () => {
  return (
    <React.Fragment>
      <Section title="For sale artwork with no editions">
        <Commercial artwork={FoSaleArtworkNoEditions} />
      </Section>
      <Section title="For sale artwork with one edition set">
        <Commercial artwork={FoSaleArtworkWithOneEdition} />
      </Section>
      <Section title="For sale artwork with multiple edition sets">
        <Commercial artwork={FoSaleArtworkWithMultipleEditions} />
      </Section>
      <Section title="Contact for price work">
        <Commercial artwork={ContactForPriceWork} />
      </Section>
    </React.Fragment>
  )
})
