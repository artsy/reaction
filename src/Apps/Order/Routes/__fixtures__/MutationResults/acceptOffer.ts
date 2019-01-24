export const acceptOfferSuccess = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
      order: {
        id: "1234",
        awaitingResponseFrom: null,
      },
    },
  },
}
export const acceptOfferFailed = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
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
      error: {
        type: "processing",
        code: "capture_failed",
        data: { some_details: "more details" },
      },
    },
  },
}
