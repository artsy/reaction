export const rejectOfferSuccess = {
  ecommerceBuyerRejectOffer: {
    orderOrError: {
      order: {
        id: "1234",
      },
    },
  },
}
export const rejectOfferFailed = {
  ecommerceBuyerRejectOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cannot_accept_offer",
        data: null,
      },
    },
  },
}
