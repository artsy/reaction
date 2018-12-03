export const FoSaleArtworkNoEditions = {
  __id: "for_sale_no_editions_artwrok",
  availability: "for sale",
  sale_message: "$40,000 - 50,000",
  is_inquireable: true,
  is_price_range: true,
  edition_sets: [],
}

export const FoSaleArtworkWithOneEdition = {
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
    },
  ],
}

export const FoSaleArtworkWithMultipleEditions = {
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
    },
    {
      __id: "for_sale_multiple_editions_edition_2",
      sale_message: "On hold",
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      edition_of: "",
    },
    {
      __id: "for_sale_multiple_editions_edition_3",
      sale_message: "On loan",
      dimensions: { in: "222 in diameter", cm: "563.9 cm diameter" },
      edition_of: "Edition 1/234",
    },
    {
      __id: "for_sale_multiple_editions_edition_4",
      sale_message: "Sold",
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      edition_of: "",
    },
  ],
}

export const ContactForPriceWork = {
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
    },
  ],
}

export const ArtworkBuyNow = {
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

export const ArtworkSold = {
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
