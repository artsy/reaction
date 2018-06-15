import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Commercial } from "../../Sidebar/Commercial"

const FoSaleArtworkNoEditions = {
  availability: "for sale",
  sale_message: "$40,000 - 50,000",
  is_inquireable: true,
  is_price_range: true,
  edition_sets: [],
}

const FoSaleArtworkWithOneEdition = {
  availability: "for sale",
  sale_message: "$2,222",
  is_inquireable: true,
  is_price_range: false,
  edition_sets: [
    {
      sale_message: "$2,222",
      dimensions: {
        in: "22 × 33 in",
        cm: "55.9 × 83.8 cm",
      },
      edition_of: "",
    },
  ],
}

const FoSaleArtworkWithMultipleEditions = {
  availability: "for sale",
  sale_message: "$2,500 - 5,000",
  is_inquireable: true,
  is_price_range: false,
  edition_sets: [
    {
      sale_message: "$2,500 - 5,000",
      dimensions: {
        in: "13 × 9 1/10 × 12 3/5 in",
        cm: "33 × 23 × 32 cm",
      },
      edition_of: "Editions 3, 5, 8-10 of 123 + 0AP",
    },
    {
      sale_message: "On hold",
      dimensions: {
        in: "1 × 2 × 3 in",
        cm: "2.5 × 5.1 × 7.6 cm",
      },
      edition_of: "",
    },
    {
      sale_message: "On loan",
      dimensions: {
        in: "222 in diameter",
        cm: "563.9 cm diameter",
      },
      edition_of: "Edition 1/234",
    },
    {
      sale_message: "Sold",
      dimensions: {
        in: "1 × 2 × 3 in",
        cm: "2.5 × 5.1 × 7.6 cm",
      },
      edition_of: "",
    },
  ],
}

const ContactForPriceWork = {
  availability: "for sale",
  sale_message: "Contact For Price",
  is_inquireable: true,
  is_price_range: false,
  edition_sets: [
    {
      dimensions: {
        in: "26 4/5 × 8 7/10 in",
        cm: "68 × 22 cm",
      },
      edition_of: "Edition 250/400/400",
    },
  ],
}

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
