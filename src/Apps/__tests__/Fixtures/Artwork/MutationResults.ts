export const OrderWithSuccess = {
  commerceCreateOrderWithArtwork: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationSuccess",
      order: {
        id: "orderId",
        mode: "BUY",
      },
    },
  },
}

export const OrderWithFailure = {
  commerceCreateOrderWithArtwork: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
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
