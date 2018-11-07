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
export const ArtworkFromPartnerWithLocations = {
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
export const ArtworkFromPartnerWithoutLocations = {
  __id: "artwork_from_partner_without_locations",
  collecting_institution: null,
  partner: PartnerWithoutLocations,
}

export const ArtworkWithCollectingInstitution = {
  collecting_institution: "National Gallery of Art, Washington D.C.",
  partner: PartnerWithLocations,
}
