import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../../../Utils/Section"
import { PartnerInfo } from "../../Sidebar/PartnerInfo"

const PartnerWithLocations = {
  __id: "UGFydG5lcjpnYWdvc2lhbg==",
  name: "Gagosian",
  href: "/gagosian-gallery",
  locations: [
    { city: "New York" },
    { city: "New York" },
    { city: "New York" },
    { city: "New York" },
    { city: "New York" },
    { city: "Beverly Hills" },
    { city: "San Francisco" },
    { city: "London" },
    { city: "London" },
    { city: "London" },
    { city: "Paris" },
    { city: "Le Bourget" },
    { city: "Rome" },
    { city: "Geneva" },
    { city: "Athens" },
    { city: "Central, Hong Kong" },
  ],
}

const PartnerWithoutLocations = {
  __id: "UGFydG5lcjpnYWxlcmllLWtyb25zYmVpbg==",
  name: "Galerie Kronsbein",
  href: "/galerie-kronsbein",
  locations: [],
}
const ArtworkWithCollectingInstitution = {
  collecting_institution: "National Gallery of Art, Washington D.C.",
}

storiesOf("Styleguide/Artwork/Sidebar", module).add("PartnerInfo", () => {
  return (
    <React.Fragment>
      <Section title="Rartner with locations">
        <PartnerInfo partner={PartnerWithLocations} />
      </Section>
      <Section title="Partner without locations">
        <PartnerInfo partner={PartnerWithoutLocations} />
      </Section>
      <Section title="Institutional seller">
        <PartnerInfo
          partner={PartnerWithoutLocations}
          artwork={ArtworkWithCollectingInstitution}
        />
      </Section>
    </React.Fragment>
  )
})
