import { ArtworkSidebarPartnerInfo as PartnerInfo } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

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
const ArtworkFromPartnerWithLocations = {
  _id: "artwork_from_partner_with_locations",
  collecting_institution: null,
  partner: PartnerWithLocations,
}

const PartnerWithoutLocations = {
  __id: "UGFydG5lcjpnYWxlcmllLWtyb25zYmVpbg==",
  name: "Galerie Kronsbein",
  href: "/galerie-kronsbein",
  locations: [],
}
const ArtworkFromPartnerWithoutLocations = {
  __id: "artwork_from_partner_without_locations",
  collecting_institution: null,
  partner: PartnerWithoutLocations,
}

const ArtworkWithCollectingInstitution = {
  collecting_institution: "National Gallery of Art, Washington D.C.",
  partner: PartnerWithLocations,
}

storiesOf("Legacy/Styleguide/Artwork/Sidebar", module).add("PartnerInfo", () => {
  return (
    <React.Fragment>
      <Section title="Rartner with locations">
        <PartnerInfo artwork={ArtworkFromPartnerWithLocations} />
      </Section>
      <Section title="Partner without locations">
        <PartnerInfo artwork={ArtworkFromPartnerWithoutLocations} />
      </Section>
      <Section title="Institutional seller">
        <PartnerInfo artwork={ArtworkWithCollectingInstitution} />
      </Section>
    </React.Fragment>
  )
})
