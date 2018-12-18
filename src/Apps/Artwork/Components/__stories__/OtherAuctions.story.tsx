import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { OtherAuctions } from "../OtherAuctions"

const auctions = [
  {
    src: "https://picsum.photos/200/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
    href: "#",
  },
  {
    src: "https://picsum.photos/400/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
    href: "#",
  },
  {
    src: "https://picsum.photos/200/600/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
    href: "#",
  },
  {
    src: "https://picsum.photos/200/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
    href: "#",
  },
]

storiesOf("Apps/Artwork Page/Components/OtherAuctions", module).add(
  "Other Auctions",
  () => {
    return (
      <Section title="Responsive Other Auctions">
        <OtherAuctions auctions={auctions} />
      </Section>
    )
  }
)
