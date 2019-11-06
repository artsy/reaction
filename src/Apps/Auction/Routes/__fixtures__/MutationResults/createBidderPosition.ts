import { BidderPositionQueryResponse } from "__generated__/BidderPositionQuery.graphql"
import { ConfirmBidCreateBidderPositionMutationResponse } from "__generated__/ConfirmBidCreateBidderPositionMutation.graphql"

export const createBidderPositionSuccessful: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: {
        internalID: "positionid",
      },
      status: "SUCCESS",
      messageHeader: null,
      messageDescriptionMD: null,
    },
  },
}

export const createBidderPositionFailed: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: null,
      status: "FAILED",
      messageHeader: "The `createBidderPosition` mutation failed.",
      messageDescriptionMD: null,
    },
  },
}

export const confirmBidBidderPositionQueryWithWinning: BidderPositionQueryResponse = {
  me: {
    bidderPosition: {
      status: "WINNING",
      messageHeader: null,
      position: {
        internalID: "winning-bidder-position-id-from-polling",
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
        internalID: "pending-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
    },
  },
}
