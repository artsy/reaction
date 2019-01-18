export const rejectOfferSuccess = {
  ecommerceBuyerRejectOffer: {
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
export const rejectOfferFailed = {
  ecommerceBuyerRejectOffer: {
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
