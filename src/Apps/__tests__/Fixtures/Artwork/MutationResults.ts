export const OrderWithSuccess = {
  ecommerceCreateOrderWithArtwork: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        id: "orderId",
        mode: "BUY",
      },
    },
  },
}

export const OrderWithFailure = {
  ecommerceCreateOrderWithArtwork: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "insufficient_inventory",
      },
    },
  },
}

export const OfferOrderWithSuccess = {
  ecommerceCreateOfferOrderWithArtwork: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        id: "orderId",
        mode: "OFFER",
      },
    },
  },
}

export const OfferOrderWithFailure = {
  ecommerceCreateOfferOrderWithArtwork: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "insufficient_inventory",
      },
    },
  },
}
