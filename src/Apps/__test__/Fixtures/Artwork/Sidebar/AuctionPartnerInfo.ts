export const ArtworkNoEstimateNoPremium = {
  _id: "auction_artwork",
  is_biddable: true,
  partner: {
    __id: "phillips",
    name: "Phillips",
  },
  sale_artwork: { estimate: null },
  sale: {
    is_with_buyers_premium: false,
  },
}

export const ArtworkWithEstimateNoPremium = {
  _id: "auction_artwork",
  is_biddable: true,
  partner: { __id: "phillips", name: "Phillips" },
  sale_artwork: { estimate: "$300 - $500" },
  sale: { is_with_buyers_premium: false },
}

export const ArtworkWithEstimateAndPremium = {
  _id: "auction_artwork",
  is_biddable: true,
  partner: {
    __id: "phillips",
    name: "Phillips",
  },
  sale_artwork: {
    estimate: "$300 - $500",
  },
  sale: {
    is_with_buyers_premium: true,
  },
}
