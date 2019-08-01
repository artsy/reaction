export const rejectOfferSuccess = {
  commerceBuyerRejectOffer: {
    orderOrError: {
      order: {
        id: "1234",
        awaitingResponseFrom: null,
      },
    },
  },
}
export const rejectOfferFailed = {
  commerceBuyerRejectOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cannot_accept_offer",
        data: null,
      },
    },
  },
}
