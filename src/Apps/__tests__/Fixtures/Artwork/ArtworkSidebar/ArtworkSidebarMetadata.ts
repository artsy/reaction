import { FullArtworkFixture } from "Apps/__tests__/Fixtures/Artwork/FullArtwork.fixture"

export const FilledOutMetadataNoEditions = {
  ...FullArtworkFixture,
  id: "filled_out_metadata_no_editions",
  is_biddable: false,
  sale_artwork: null,
  title: "Easel (Vydock)",
  date: "1995",
  medium: "Acrylic and graphite on bonded aluminium",
  edition_sets: [],
  dimensions: {
    in: "97 × 15 in",
    cm: "246.4 × 38.1 cm",
  },
  edition_of: "",
  attribution_class: {
    short_description: "This is a unique work",
  },
}

export const FilledOutMetadataOneEditionSet = {
  ...FullArtworkFixture,
  id: "filled_out_metadata_one_editions_set:richard-anuszkiewicz-sun-keyed",
  is_biddable: false,
  sale_artwork: null,
  title: "Sun Keyed",
  date: "1972",
  medium: "Serigraph",
  edition_sets: [
    {
      id: "RWRpdGlvblNldDo1NzIzYTIzNTEzOWIyMTEyNzEwMDAzNzY=",
      dimensions: { in: "14 × 18 in", cm: "35.6 × 45.7 cm" },
      edition_of: "Edition of 3000",
      is_offerable: false,
      is_acquireable: true,
    },
  ],
  dimensions: { in: "14 × 18 in", cm: "35.6 × 45.7 cm" },
  edition_of: "Edition of 3000",
  attribution_class: {
    short_description: "This is part of a limited edition set",
  },
}

export const FilledOutMetadataMultipleEditionSets = {
  ...FullArtworkFixture,
  id: "filled_out_multiple_edition_set:kim-keever-abstract-36742",
  is_biddable: false,
  sale_artwork: null,
  title: "Abstract 36742",
  date: "2018",
  medium: "Premium high gloss archival print",
  edition_sets: [
    {
      id: "RWRpdGlvblNldDo1YjIyOWFkNmE2Y2E2ZDEzNjkxOWZkZTY=",
      dimensions: { in: "24 × 26 in", cm: "61 × 66 cm" },
      edition_of: "",
      is_offerable: false,
      is_acquireable: true,
    },
    {
      id: "RWRpdGlvblNldDo1YjIyOWFkNjViMmZiYTE3NmZjOTliZmU=",
      dimensions: { in: "40 × 42 in", cm: "101.6 × 106.7 cm" },
      edition_of: "Edition of 3000",
      is_offerable: false,
      is_acquireable: true,
    },
  ],
  dimensions: { in: "40 × 42 in", cm: "101.6 × 106.7 cm" },
  edition_of: "Edition of 3000",
  attribution_class: {
    short_description: "This is part of a limited edition set",
  },
}

export const EmptyMetadataNoEditions = {
  ...FullArtworkFixture,
  id: "empty_metadata_no_editions",
  title: "Empty metadata / No editions",
  is_biddable: false,
  sale_artwork: null,
  date: " ",
  medium: "",
  dimensions: { in: null, cm: null },
  edition_of: "",
  attribution_class: null,
  edition_sets: [],
}

export const EmptyMetadataOneEditionSet = {
  ...FullArtworkFixture,
  id: "empty_metadata_one_edition",
  title: "Empty metadata / One edition set",
  is_biddable: false,
  sale_artwork: null,
  date: " ",
  medium: "",
  dimensions: { in: null, cm: null },
  edition_of: "",
  attribution_class: null,
  edition_sets: [
    {
      id: "5b1fff790923cc00205152fe",
      is_offerable: false,
      is_acquireable: true,
    },
  ],
}

export const EmptyMetadataMultipleEditionSets = {
  ...FullArtworkFixture,
  id: "empty_metadata_multple_editions",
  title: "Empty metadata / Multiple edition Sets",
  is_biddable: false,
  sale_artwork: null,
  date: " ",
  medium: "",
  dimensions: { in: null, cm: null },
  edition_of: "",
  attribution_class: null,
  edition_sets: [
    {
      id: "5b1ffd455405ff0020d933bb",
      is_offerable: false,
      is_acquireable: true,
    },
    {
      id: "5b1ffdb20923cc00205152d3",
      is_offerable: false,
      is_acquireable: true,
    },
  ],
}

export const MetadataForAuctionWork = {
  ...FullArtworkFixture,
  id:
    "metadata_for_auction_work:marc-chagall-then-the-boy-displayed-to-the-dervish-his-bosom-saying-look-at-my-breasts-which-be-goodlier-than-the-breasts-of-maidens-and-my-lipdews-are-sweeter-than-sugar-candy-dot-dot-dot-from-four-tales-from-the-arabian-nights",
  is_biddable: true,
  sale_artwork: { lot_label: "210" },
  title:
    'Then the boy displayed to the Dervish his bosom, saying: "Look at my breasts which be goodlier than the breasts of maidens and my lipdews are sweeter than sugar candy...", from Four Tales from the Arabian Nights',
  date: "1948",
  medium: "Lithograph in colors, on laid paper",
  edition_sets: [],
  dimensions: { in: "17 × 13 in", cm: "43.2 × 33 cm" },
  edition_of: "",
  attribution_class: {
    short_description: "This is part of a limited edition set",
  },
}
