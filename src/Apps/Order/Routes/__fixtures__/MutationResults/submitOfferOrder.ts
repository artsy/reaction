import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const submitOfferOrderWithFailure = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
      },
    },
  },
}

export const submitOfferOrderWithVersionMismatchFailure = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "artwork_version_mismatch",
        data: null,
      },
    },
  },
}

export const submitOfferOrderWithNoInventoryFailure = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: null,
      },
    },
  },
}

export const submitOfferOrderSuccess = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
      },
    },
  },
}
