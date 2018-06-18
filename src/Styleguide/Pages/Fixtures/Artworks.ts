import { SingleFollowedArtist } from "./Artists"

export const ArtworkWithCompleteData = {
  artists: SingleFollowedArtist,
  title: "Wall with editions",
  date: "some time in 2016",
  medium: "Paper",
  dimensions: {
    in: "222 in diameter",
    cm: "563.9 cm diameter",
  },
  edition_of: null,
  attribution_class: {
    short_description: "This is an editioned multiple",
  },
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
