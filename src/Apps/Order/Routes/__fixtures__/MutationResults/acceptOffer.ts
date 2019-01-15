export const acceptOfferSuccess = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        __typename: "OfferOrder",
        id: "1234",
        awaitingResponseFrom: null,
      },
    },
  },
}
export const acceptOfferFailed = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "cannot_accept_offer",
        data: null,
      },
    },
  },
}
export const AcceptOfferPaymentFailed = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "capture_failed",
        data: { some_details: "more details" },
      },
    },
  },
}
