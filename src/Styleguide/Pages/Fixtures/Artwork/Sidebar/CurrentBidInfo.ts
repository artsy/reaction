export const ClosedAuctionArtwork = {
  _id: "artwork_from_closed_auction",
  sale: { is_open: false, is_closed: true, is_live_open: false },
  sale_artwork: {
    lot_label: "2",
    estimate: "£15,000–£20,000",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: { display: "£12,000" },
    counts: { bidder_positions: 0 },
  },
}

export const OpenAuctionNoReserveNoBids = {
  sale: {
    is_open: true,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    lot_label: "3",
    estimate: "£300–£500",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: {
      display: "£200",
    },
    counts: {
      bidder_positions: 0,
    },
  },
}

export const OpenAuctionNoReserveWithBids = {
  _id: "artwork_from_open_auction",
  sale: { is_open: true, is_closed: false, is_live_open: false },
  sale_artwork: {
    lot_label: "14002",
    estimate: "$800–$1,200",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: { display: "$400" },
    counts: { bidder_positions: 1 },
  },
}

export const OpenAuctionReserveNoBids = {
  sale: {
    is_open: true,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    lot_label: "6",
    estimate: "$5,000–$7,000",
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "$2,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
}

export const OpenAuctionReserveNotMetWithBids = {
  sale: {
    is_open: true,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    lot_label: "6",
    estimate: "$18,000–$22,000",
    is_with_reserve: true,
    reserve_message: "Reserve not met",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "$14,000",
    },
    counts: {
      bidder_positions: 1,
    },
  },
}

export const OpenAuctionReserveMetWithBids = {
  _id: "artwork_from_open_auction",
  sale: {
    is_open: true,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    lot_label: "2",
    estimate: "$700–$900",
    is_with_reserve: true,
    reserve_message: "Reserve met",
    reserve_status: "reserve_met",
    current_bid: { display: "$450" },
    counts: { bidder_positions: 3 },
  },
}

export const MyBidWinning = {
  bidder_status: {
    active_bid: {
      max_bid: {
        display: "$15,000",
      },
      is_winning: true,
    },
  },
}

export const MyBidLoosing = {
  bidder_status: {
    active_bid: {
      max_bid: {
        display: "$400",
      },
      is_winning: false,
    },
  },
}

export const LiveAuctionInProgeress = {
  _id: "artwork_from_live_auction",
  sale: {
    is_open: true,
    is_closed: false,
    is_live_open: true,
  },
  sale_artwork: {
    lot_label: "2",
    estimate: "$700–$900",
    is_with_reserve: true,
    reserve_message: "Reserve met",
    reserve_status: "reserve_met",
    current_bid: { display: "$450" },
    counts: { bidder_positions: 3 },
  },
}
