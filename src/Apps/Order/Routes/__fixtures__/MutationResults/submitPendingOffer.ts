export const submitPendingOfferSuccess = {
  ecommerceSubmitPendingOffer: {
    orderOrError: {
      order: {
        id: "1234",
        myLastOffer: {
          id: "off-1",
        },
        lastOffer: {
          id: "off-1",
        },
      },
    },
  },
}
export const submitPendingOfferFailed = {
  ecommerceSubmitPendingOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cannot_accept_offer",
        data: null,
      },
    },
  },
}

export const insufficientInventoryResponse = {
  ecommerceSubmitPendingOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "insufficient_inventory",
        data: null,
      },
    },
  },
}
