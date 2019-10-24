import { FullArtworkFixture } from "Apps/__tests__/Fixtures/Artwork/FullArtwork.fixture"

export const ForSaleArtworkNoEditions = {
  ...FullArtworkFixture,
  __id: "for_sale_no_editions_artwrok",
  availability: "for sale",
  sale_message: "$40,000 - 50,000",
  is_inquireable: true,
  is_price_range: true,
  edition_sets: [],
}

export const ForSaleArtworkWithOneEdition = {
  ...FullArtworkFixture,
  __id: "for_sale_one_edition_artwrok",
  availability: "for sale",
  sale_message: "$2,222",
  is_inquireable: true,
  is_price_range: false,
  edition_sets: [
    {
      __id: "for_sale_one_edition_edition",
      sale_message: "$2,222",
      dimensions: { in: "22 × 33 in", cm: "55.9 × 83.8 cm" },
      edition_of: "",
      is_acquireable: true,
      is_offerable: true,
    },
  ],
}

export const ForSaleArtworkWithMultipleEditions = {
  ...FullArtworkFixture,
  __id: "for_sale_multiple_editions_artwrok",
  availability: "for sale",
  sale_message: "$2,500 - 5,000",
  is_inquireable: true,
  is_price_range: false,
  edition_sets: [
    {
      __id: "for_sale_multiple_editions_edition_1",
      sale_message: "$2,500 - 5,000",
      dimensions: { in: "13 × 9 1/10 × 12 3/5 in", cm: "33 × 23 × 32 cm" },
      edition_of: "Editions 3, 5, 8-10 of 123 + 0AP",
      is_acquireable: true,
      is_offerable: true,
    },
    {
      __id: "for_sale_multiple_editions_edition_2",
      sale_message: "On hold",
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      edition_of: "",
      is_acquireable: true,
      is_offerable: true,
    },
    {
      __id: "for_sale_multiple_editions_edition_3",
      sale_message: "On loan",
      dimensions: { in: "222 in diameter", cm: "563.9 cm diameter" },
      edition_of: "Edition 1/234",
      is_acquireable: true,
      is_offerable: true,
    },
    {
      __id: "for_sale_multiple_editions_edition_4",
      sale_message: "Sold",
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      edition_of: "",
      is_acquireable: true,
      is_offerable: true,
    },
  ],
}

export const ContactForPriceWork = {
  ...FullArtworkFixture,
  __id: "contact_for_price_artwork",
  availability: "for sale",
  sale_message: "Contact For Price",
  is_inquireable: true,
  is_price_range: false,
  edition_sets: [
    {
      __id: "contact_for_price_edition_1",
      dimensions: { in: "26 4/5 × 8 7/10 in", cm: "68 × 22 cm" },
      edition_of: "Edition 250/400/400",
      is_acquireable: true,
      is_offerable: true,
      sale_message: "Contact for Price",
    },
  ],
}

export const ArtworkOfferableAndInquireable = {
  ...FullArtworkFixture,
  __id: "artwork_offer_inquireable",
  sale_message: "$10,000",
  is_acquireable: false,
  is_inquireable: true,
  is_offerable: true,
  pickup_available: false,
  edition_sets: [],
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
}

export const ArtworkBuyNow = {
  ...FullArtworkFixture,
  __id: "artwork_buy_now",
  sale_message: "$10,000",
  is_acquireable: true,
  is_inquireable: false,
  is_offerable: false,
  pickup_available: false,
  edition_sets: [],
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
}

export const ArtworkBuyNowWithMultipleEditions = {
  ...FullArtworkFixture,
  __id: "artwork_buy_now_multiple_editions",
  sale_message: "$2,000 - $2,500",
  is_acquireable: true,
  is_inquireable: false,
  is_offerable: false,
  pickup_available: false,
  is_price_range: true,
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
  edition_sets: [
    {
      id: "buy_now_multiple_editions_edition_1",
      __id: "buy_now_multiple_editions_edition_1",
      sale_message: "$2,000",
      is_acquireable: true,
      dimensions: { in: "13 × 9 1/10 × 12 3/5 in", cm: "33 × 23 × 32 cm" },
      edition_of: "Editions 11-20 of 123 + 0AP",
      is_offerable: false,
    },
    {
      id: "buy_now_multiple_editions_edition_2",
      __id: "buy_now_multiple_editions_edition_2",
      sale_message: "$2,500",
      is_acquireable: true,
      dimensions: { in: "13 × 9 1/10 × 12 3/5 in", cm: "33 × 23 × 32 cm" },
      edition_of: "Editions 3, 5, 8-10 of 123 + 0AP",
      is_offerable: false,
    },
    {
      id: "for_sale_multiple_editions_edition_3",
      __id: "for_sale_multiple_editions_edition_3",
      is_acquireable: false,
      sale_message: "Sold",
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      edition_of: "",
      is_offerable: false,
    },
  ],
}

export const ArtworkBuyNowSoldWithMultipleEditions = {
  ...FullArtworkFixture,
  __id: "artwork_buy_now_multiple_editions",
  sale_message: "Sold",
  is_acquireable: false,
  is_inquireable: false,
  is_offerable: false,
  is_price_range: false,
  pickup_available: false,
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
  edition_sets: [
    {
      __id: "for_sale_multiple_editions_edition_4",
      is_acquireable: false,
      sale_message: "Sold",
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      edition_of: "",
      is_offerable: false,
    },
    {
      __id: "buy_now_multiple_editions_edition_1",
      sale_message: "Sold",
      is_acquireable: false,
      dimensions: { in: "13 × 9 1/10 × 12 3/5 in", cm: "33 × 23 × 32 cm" },
      edition_of: "Editions 3, 5, 8-10 of 123 + 0AP",
      is_offerable: false,
    },
  ],
}

export const ArtworkSold = {
  ...FullArtworkFixture,
  __id: "artwork_sold",
  sale_message: "Sold",
  is_acquireable: false,
  is_inquireable: false,
  is_offerable: false,
  pickup_available: false,
  edition_sets: [],
  shippingInfo: null,
  shippingOrigin: null,
}

export const ArtworkMakeOffer = {
  ...FullArtworkFixture,
  __id: "artwork_sold",
  sale_message: "$10,000",
  is_acquireable: false,
  is_inquireable: false,
  is_offerable: true,
  pickup_available: false,
  edition_sets: [],
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
}

export const ArtworkBuyNowMakeOffer = {
  ...FullArtworkFixture,
  __id: "artwork_buy_now_make_offer",
  sale_message: "$10,000",
  is_acquireable: true,
  is_inquireable: false,
  is_offerable: true,
  pickup_available: false,
  edition_sets: [],
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
}

export const ArtworkSingleEditionHiddenAvailability = {
  ...FullArtworkFixture,
  __id: "artwork_single_etition_hidden_availability",
  is_acquireable: false,
  is_inquireable: true,
  is_offerable: false,
  pickup_available: false,
  sale_message: null,
  shippingInfo: "Shipping, tax, and service quoted by seller",
  shippingOrigin: null,
  edition_sets: [
    {
      id: "5bfd7208773e1e6a1baa3b61",
      __id: "RWRpdGlvblNldDo1YmZkNzIwODc3M2UxZTZhMWJhYTNiNjE=",
      is_acquireable: false,
      is_offerable: false,
      sale_message: null,
      dimensions: { in: "20 × 24 in", cm: "50.8 × 61 cm" },
      edition_of: "Edition of 25",
    },
  ],
}
