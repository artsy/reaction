export const ClosedAuctionArtwork = {
  _id: "artwork_from_closed_auction",
  sale: {
    is_closed: true,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "$3,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
}

export const AuctionPreview = {
  _id: "artwork_from_auction_preview",
  sale: {
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: {
      display: "CHF 4,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
}

export const AuctionPreviewNoStartingBid = {
  _id: "artwork_from_auction_preview",
  sale: {
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: null,
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
}

export const OpenAuctionNoReserveNoBids = {
  _id: "open_auction_no_reserve_no_bids",
  sale: {
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: {
      display: "$500",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
}

export const OpenAuctionNoReserveWithBids = {
  _id: "artwork_from_open_auction",

  sale: {
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: {
      display: "$850",
    },
    counts: {
      bidder_positions: 11,
    },
  },
  myLotStanding: null,
}

export const OpenAuctionReserveNoBids = {
  _id: "open_auction_reserve_no_bids",
  sale: {
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "$3,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
}

export const OpenAuctionReserveNotMetWithBids = {
  _id: "open_auction_reserve_not_met_with_bids",
  sale: {
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: true,
    reserve_message: "Reserve not met",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "$10,000",
    },
    counts: {
      bidder_positions: 2,
    },
  },
  myLotStanding: null,
}

export const OpenAuctionReserveMetWithBids = {
  _id: "open_auction_reserve_met_with_bids",
  sale: {
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    is_with_reserve: true,
    reserve_message: "Reserve met",
    reserve_status: "reserve_met",
    current_bid: {
      display: "$500",
    },
    counts: {
      bidder_positions: 2,
    },
  },
  myLotStanding: null,
}

export const OpenAuctionReserveMetWithMyWinningBid = {
  _id: "open_auction_reserve_met_my_winning_bid",
  ...OpenAuctionReserveMetWithBids,
  myLotStanding: [
    {
      most_recent_bid: { is_winning: true, max_bid: { display: "$15,000" } },
      active_bid: { is_winning: true },
    },
  ],
}

export const OpenAuctionReserveMetWithMyLosingBid = {
  _id: "open_auction_reserve_met_my_losing_bid",
  ...OpenAuctionReserveMetWithBids,
  myLotStanding: [
    {
      most_recent_bid: { is_winning: false, max_bid: { display: "$400" } },
      active_bid: null,
    },
  ],
}

export const LiveAuctionInProgeress = {
  _id: "artwork_from_live_auction",
  sale: { is_closed: false, is_live_open: true },
  sale_artwork: {
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: { display: "€3,200" },
    counts: { bidder_positions: 0 },
  },
  myLotStanding: null,
}
