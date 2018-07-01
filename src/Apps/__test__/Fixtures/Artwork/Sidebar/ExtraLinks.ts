export const ArtworkNotForSaleWithNoConsignableArtists = {
  __id: "not_for_sale_no_consign",
  is_in_auction: false,
  is_for_sale: false,
  artists: [{ __id: "no_consign_artist", is_consignable: false }],
  sale: null,
}
export const ForSaleArtworkWithNoConsignableArtists = {
  __id: "for_sale_no_consign",
  is_in_auction: false,
  is_for_sale: true,
  artists: [{ __id: "no_consign_artist", is_consignable: false }],
  sale: null,
}
export const ForSaleArtworkWithOneConsignableArtist = {
  __id: "for_sale_one_consign",
  is_in_auction: false,
  is_for_sale: true,
  artists: [{ __id: "consign_artist", is_consignable: true }],
  sale: null,
}
export const ForSaleArtworkWithMultipleConsignableArtists = {
  __id: "for_sale_one_consign",
  is_in_auction: false,
  is_for_sale: true,
  artists: [
    { __id: "another_consign_artist", is_consignable: true },
    { __id: "consign_artist", is_consignable: true },
  ],
  sale: null,
}
export const ArtworkNotForSaleWithOneConsignableArtist = {
  __id: "not_for_sale_one_consign",
  is_in_auction: false,
  is_for_sale: false,
  artists: [{ __id: "consign_artist", is_consignable: true }],
  sale: null,
}
export const ArtworkNotForSaleWithMultipleConsignableArtist = {
  __id: "not_for_sale_one_consign",
  is_in_auction: false,
  is_for_sale: false,
  artists: [
    { __id: "another_consign_artist", is_consignable: true },
    { __id: "consign_artist", is_consignable: true },
  ],
  sale: null,
}

export const ArtworkFromLiveAuction = {
  __id: "not_for_sale_one_consign",
  is_in_auction: true,
  is_for_sale: true,
  artists: [
    { __id: "another_consign_artist", is_consignable: true },
    { __id: "consign_artist", is_consignable: true },
  ],
  sale: {
    is_closed: false,
  },
}
