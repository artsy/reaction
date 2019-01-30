export const submitOfferOrderWithFailure = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
      },
    },
  },
}

export const submitOfferOrderWithVersionMismatchFailure = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: { type: "processing", code: "artwork_version_mismatch" },
    },
  },
}

export const submitOfferOrderWithNoInventoryFailure = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
      },
    },
  },
}
