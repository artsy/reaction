export const ArtworkFromAuctionPreview = {
  _id: "artwork_from_preview_auction",
  sale: {
    registrationStatus: null,
    is_preview: true,
    is_open: false,
    is_live_open: false,
    is_closed: false,
    is_registration_closed: false,
  },
  sale_artwork: {
    increments: [
      { cents: 400000, display: "CHF4,000" },
      { cents: 425000, display: "CHF4,250" },
      { cents: 450000, display: "CHF4,500" },
      { cents: 475000, display: "CHF4,750" },
    ],
  },
  myLotStanding: null,
}

export const ArtworkFromTimedAuctionRegistrationOpen = {
  _id: "artwork_from_open_non_live_auction",
  sale: {
    registrationStatus: null,
    is_preview: false,
    is_open: true,
    is_live_open: false,
    is_closed: false,
    is_registration_closed: false,
  },
  sale_artwork: {
    increments: [
      { cents: 90000, display: "$900" },
      { cents: 95000, display: "$950" },
      { cents: 100000, display: "$1,000" },
      { cents: 110000, display: "$1,100" },
    ],
  },
  myLotStanding: null,
}

export const ArtworkFromTimedAuctionRegistrationClosed = {
  _id: "artwork_from_open_non_live_auction",
  sale: {
    registrationStatus: null,
    is_preview: false,
    is_open: true,
    is_live_open: false,
    is_closed: false,
    is_registration_closed: true,
  },
  sale_artwork: {
    increments: [
      { cents: 750000, display: "$7,500" },
      { cents: 800000, display: "$8,000" },
      { cents: 850000, display: "$8,500" },
      { cents: 900000, display: "$9,000" },
    ],
  },
  myLotStanding: null,
}

export const ArtworkFromLiveAuctionRegistrationOpen = {
  _id: "artwork_from_open_live_auction_open_registration",
  sale: {
    registrationStatus: null,
    is_preview: false,
    is_open: true,
    is_live_open: true,
    is_closed: false,
    is_registration_closed: false,
  },
  sale_artwork: {
    increments: [
      { cents: 320000, display: "€3,200" },
      { cents: 350000, display: "€3,500" },
      { cents: 380000, display: "€3,800" },
      { cents: 400000, display: "€4,000" },
    ],
  },
  myLotStanding: null,
}

export const ArtworkFromLiveAuctionRegistrationClosed = {
  _id: "artwork_from_open_live_auction_closed_registration",
  sale: {
    registrationStatus: null,
    is_preview: false,
    is_open: true,
    is_live_open: true,
    is_closed: false,
    is_registration_closed: true,
  },
  sale_artwork: {
    increments: [
      { cents: 320000, display: "€3,200" },
      { cents: 350000, display: "€3,500" },
      { cents: 380000, display: "€3,800" },
      { cents: 400000, display: "€4,000" },
    ],
  },
  myLotStanding: null,
}

export const ArtworkFromClosedAuction = {
  _id: "artwork_from_closed_auction",
  sale: {
    registrationStatus: null,
    is_preview: false,
    is_open: false,
    is_live_open: false,
    is_closed: true,
    is_registration_closed: false,
  },
  sale_artwork: {
    increments: [
      { cents: 425000, display: "£4,250" },
      { cents: 450000, display: "£4,500" },
      { cents: 475000, display: "£4,750" },
      { cents: 500000, display: "£5,000" },
    ],
  },
  myLotStanding: null,
}

export const NotRegisteredToBid = {
  myLotStanding: null,
  sale: {
    registrationStatus: null,
  },
}

export const BidderPendingApproval = {
  myLotStanding: null,
  sale: {
    registrationStatus: {
      id: "bidder_pending_approval",
      qualified_for_bidding: false,
    },
  },
}

export const RegisteredBidder = {
  myLotStanding: null,
  sale: {
    registrationStatus: { id: "bidder_approved", qualified_for_bidding: true },
  },
}

export const RegistedBidderWithBids = {
  myLotStanding: [{ active_bid: { __id: "some bid present" } }],
  sale: {
    registrationStatus: { id: "bidder_approved", qualified_for_bidding: true },
  },
}
