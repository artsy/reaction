export const submitOrderWithFailure = {
  submitOrder: {
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

export const submitOrderWithVersionMismatchFailure = {
  submitOrder: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: { type: "processing", code: "artwork_version_mismatch" },
    },
  },
}

export const submitOrderWithNoInventoryFailure = {
  submitOrder: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
      },
    },
  },
}
