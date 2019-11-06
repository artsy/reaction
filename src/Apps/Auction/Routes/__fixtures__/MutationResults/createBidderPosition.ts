import { BidderPositionQueryResponse } from "__generated__/BidderPositionQuery.graphql"
import { ConfirmBidCreateBidderPositionMutationResponse } from "__generated__/ConfirmBidCreateBidderPositionMutation.graphql"

export const createBidderPositionSuccessful: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: {
        id: "positionid",
        sale_artwork: {
          sale: {
            registrationStatus: {
              id: "existing-bidder-id",
            },
          },
        },
      },
      status: "SUCCESS",
      messageHeader: null,
    },
  },
}

export const createBidderPositionSuccessfulAndBidder: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: {
        id: "positionid",
        sale_artwork: {
          sale: {
            registrationStatus: {
              id: "new-bidder-id",
            },
          },
        },
      },
      status: "SUCCESS",
      messageHeader: null,
    },
  },
}

export const createBidderPositionFailed: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: null,
      status: "FAILED",
      messageHeader: "Sale Closed to Bids",
    },
  },
}

export const confirmBidBidderPositionQueryWithWinning: BidderPositionQueryResponse = {
  me: {
    bidderPosition: {
      status: "WINNING",
      messageHeader: null,
      position: {
        id: "winning-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
    },
  },
}

export const confirmBidBidderPositionQueryWithPending: BidderPositionQueryResponse = {
  me: {
    bidderPosition: {
      status: "PENDING",
      messageHeader: null,
      position: {
        id: "pending-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
    },
  },
}

export const confirmBidBidderPositionQueryWithOutbid: BidderPositionQueryResponse = {
  me: {
    bidderPosition: {
      status: "OUTBID",
      messageHeader: "Your bid wasn’t high enough",
      position: {
        id: "pending-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
    },
  },
}
