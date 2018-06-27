export const ArtworkPreviewAuction = {
  _id: "artwork_from_preview_auction",
  sale: {
    is_preview: true,
    is_open: false,
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: null,
    is_registration_closed: false,
  },
  sale_artwork: {
    lot_label: "2",
    estimate: "CHF 475–CHF 750",
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "CHF 350",
    },
    counts: {
      bidder_positions: 0,
    },
  },
}

export const NotRegisteredToBid = {
  bidder_status: {},
  bidders: [
    {
      id: "bidder_waiting_approval",
      qualified_for_bidding: false,
    },
  ],
}

export const BidderPendingApproval = {
  bidder_status: {},
  bidders: [
    {
      id: "bidder_pending_approval",
      qualified_for_bidding: false,
    },
  ],
}

export const RegistedBidder = {
  bidder_status: {},
  bidders: [
    {
      id: "bidder_approved",
      qualified_for_bidding: true,
    },
  ],
}
