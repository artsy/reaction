export const ArtworkClosedAuction = {
  _id: "artwork_auction_closed",
  partner: {
    _id: "5acd52b11a1e866b17e16045",
    name: "Art For Life: Benefit Auction 2018",
  },
  sale_artwork: {
    estimate: "$5,000",
  },
  sale: {
    _id: "5bdb70e27ffd411bc71ee16c",
    is_closed: true,
    is_with_buyers_premium: null,
  },
}

export const ArtworkAuctionPreview = {
  _id: "artwork_auction_preview",
  partner: {
    _id: "553e693d7261695a85350100",
    name: "Christie's",
  },
  sale_artwork: {
    estimate: "$500,000–$700,000",
  },
  sale: {
    _id: "5c05aa507c4cf06fa475b354",
    is_closed: false,
    is_with_buyers_premium: true,
  },
}

export const ArtworkNoEstimateNoPremium = {
  _id: "auction_artwork",
  partner: {
    _id: "5bd72842658111197ca3e697",
    name: "Fountain House Gallery: Benefit Auction 2018",
  },
  sale_artwork: {
    estimate: null,
  },
  sale: {
    _id: "5bd7286433a1110029a0e9ec",
    is_closed: false,
    is_with_buyers_premium: null,
  },
}

export const ArtworkWithEstimateNoPremium = {
  _id: "auction_artwork_estimate",
  partner: {
    _id: "5a3842668b0c1457e619554e",
    name: "Heather James Fine Art: Benefit Auction 2018",
  },
  sale_artwork: {
    estimate: "$3,500",
  },
  sale: {
    _id: "5bf2c924a4685802e05a1456",
    is_closed: false,
    is_with_buyers_premium: null,
  },
}

export const ArtworkWithEstimateAndPremium = {
  _id: "auction_artwork_estimate_premium",
  partner: {
    _id: "5a84a434275b247345983eac",
    name: "Bruun Rasmussen",
  },
  sale_artwork: {
    estimate: "DKK 100,000–DKK 125,000",
  },
  sale: {
    _id: "5bedc643023c175c11b9ee9c",
    is_closed: false,
    is_with_buyers_premium: true,
  },
}
