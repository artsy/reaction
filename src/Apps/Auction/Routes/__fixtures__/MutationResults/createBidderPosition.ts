import { ConfirmBidCreateBidderPositionMutationResponse } from "__generated__/ConfirmBidCreateBidderPositionMutation.graphql"

export const createBidderPositionSuccessful: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: {
        id: "positionid",
      },
      status: "SUCCESS",
      message_header: null,
      message_description_md: null,
    },
  },
}

export const createBidderPositionFailed: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: null,
      status: "FAILED",
      message_header: "The `createBidderPosition` mutation failed.",
      message_description_md: null,
    },
  },
}
