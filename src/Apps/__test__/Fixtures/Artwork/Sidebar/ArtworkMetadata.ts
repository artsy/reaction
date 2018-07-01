export const FilledOutMetadataNoEditions = {
  __id: "filled_out_metadata_no_editions",
  title: "Full metadata / No editions",
  date: "2016-2017",
  medium:
    "Hand selected materials to print this piece were sourced from the old villages on magic lands",
  dimensions: {
    in: "48 2/5 in diameter",
    cm: "123 cm diameter",
  },
  edition_of: null,
  attribution_class: {
    short_description: "This is a made-to-order piece",
  },
  edition_sets: [],
}

export const FilledOutMetadataOneEditionSet = {
  __id: "filled_out_metadata_one_editions_set",
  title: "Full metadata / One Edition Set",
  date: "2016-2017",
  medium:
    "Hand selected materials to print this piece were sourced from the old villages on magic lands",
  dimensions: { in: "4 3/10 × 8 7/10 × 13 in", cm: "11 × 22 × 33 cm" },
  edition_of: "Edition of 21",
  attribution_class: { short_description: "This is a made-to-order piece" },
  edition_sets: [{ __id: "5b1ffd455405ff0020d933bb" }],
}

export const FilledOutMetadataMultipleEditionSets = {
  __id: "filled_out_metadata_multiple_editions",
  title: "Full metadata / Multiple edition sets",
  date: "2016-2017",
  medium:
    "Hand selected materials to print this piece were sourced from the old villages on magic lands",
  dimensions: { in: "22 × 33 × 11 in", cm: "55.9 × 83.8 × 27.9 cm" },
  edition_of: null,
  attribution_class: { short_description: "This is a made-to-order piece" },
  edition_sets: [
    { __id: "5b1ffd455405ff0020d933bb" },
    { __id: "5b1ffdb20923cc00205152d3" },
  ],
}

export const EmptyMetadataNoEditions = {
  __id: "empty_metadata_no_editions",
  title: "Empty metadata / No editions",
  date: " ",
  medium: "",
  dimensions: { in: null, cm: null },
  edition_of: null,
  attribution_class: null,
  edition_sets: [],
}

export const EmptyMetadataOneEditionSet = {
  __id: "empty_metadata_one_edition",
  title: "Empty metadata / One edition set",
  date: " ",
  medium: "",
  dimensions: { in: null, cm: null },
  edition_of: "",
  attribution_class: null,
  edition_sets: [{ __id: "5b1fff790923cc00205152fe" }],
}

export const EmptyMetadataMultipleEditionSets = {
  __id: "empty_metadata_multple_editions",
  title: "Empty metadata / Multiple edition Sets",
  date: " ",
  medium: "",
  dimensions: { in: null, cm: null },
  edition_of: "",
  attribution_class: null,
  edition_sets: [
    { __id: "5b1ffd455405ff0020d933bb" },
    { __id: "5b1ffdb20923cc00205152d3" },
  ],
}
