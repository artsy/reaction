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

export const acceptOfferPaymentFailed = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        type: "processing",
        code: "capture_failed",
        data: null,
      },
    },
  },
}

export const acceptOfferPaymentFailedInsufficientFunds = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        type: "processing",
        code: "capture_failed",
        data: `{"failure_code": "insufficient_funds"}`,
      },
    },
  },
}

export const acceptOfferInsufficientInventoryFailure = {
  ecommerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: "No moar artwork (╯°□°）╯︵ ┻━┻",
      },
    },
  },
}
