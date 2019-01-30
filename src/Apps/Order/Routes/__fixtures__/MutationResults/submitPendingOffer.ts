import { OfferOrderWithOffers } from "Apps/__tests__/Fixtures/Order"

export const submitPendingOfferSuccess = {
  ecommerceSubmitPendingOffer: {
    orderOrError: {
      order: {
        ...OfferOrderWithOffers,
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
