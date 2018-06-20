export const ArtworkNotForSaleWithNoConsignableArtists = {
  __id: "not_for_sale_no_consign",
  is_biddable: false,
  is_for_sale: false,
  artists: [{ __id: "no_consign_artist", is_consignable: false }],
}
export const ForSaleArtworkWithNoConsignableArtists = {
  __id: "for_sale_no_consign",
  is_biddable: false,
  is_for_sale: true,
  artists: [{ __id: "no_consign_artist", is_consignable: false }],
}
export const ForSaleArtworkWithOneConsignableArtist = {
  __id: "for_sale_one_consign",
  is_biddable: false,
  is_for_sale: true,
  artists: [{ __id: "consign_artist", is_consignable: true }],
}
export const ForSaleArtworkWithMultipleConsignableArtists = {
  __id: "for_sale_one_consign",
  is_biddable: false,
  is_for_sale: true,
  artists: [
    { __id: "another_consign_artist", is_consignable: true },
    { __id: "consign_artist", is_consignable: true },
  ],
}
export const ArtworkNotForSaleWithOneConsignableArtist = {
  __id: "not_for_sale_one_consign",
  is_biddable: false,
  is_for_sale: false,
  artists: [{ __id: "consign_artist", is_consignable: true }],
}
export const ArtworkNotForSaleWithMultipleConsignableArtist = {
  __id: "not_for_sale_one_consign",
  is_biddable: false,
  is_for_sale: false,
  artists: [
    { __id: "another_consign_artist", is_consignable: true },
    { __id: "consign_artist", is_consignable: true },
  ],
}

export const ArtworkFromLiveAuction = {
  __id: "not_for_sale_one_consign",
  is_biddable: true,
  is_for_sale: true,
  artists: [
    { __id: "another_consign_artist", is_consignable: true },
    { __id: "consign_artist", is_consignable: true },
  ],
}
