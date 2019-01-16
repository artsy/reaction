import { OfferOrderWithOffers } from "Apps/__tests__/Fixtures/Order"

export const submitPendingOfferSuccess = {
  ecommerceSubmitPendingOffer: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        __typename: "OfferOrder",
        ...OfferOrderWithOffers,
      },
    },
  },
}
export const submitPendingOfferFailed = {
  ecommerceSubmitPendingOffer: {
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

export const insufficientInventoryResponse = {
  ecommerceSubmitPendingOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "insufficient_inventory",
        data: null,
      },
    },
  },
}
