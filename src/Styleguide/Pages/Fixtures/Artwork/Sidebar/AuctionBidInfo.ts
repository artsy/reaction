export const ClosedAuctionArtwork = {
  _id: "artwork_from_closed_auction",
  sale: {
    is_open: false,
    is_closed: true,
  },
}

export const OpenAuctionArtwork = {
  _id: "artwork_from_open_auction",
  sale: {
    is_open: true,
    is_closed: false,
  },
}
