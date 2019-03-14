import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const submitOfferOrderWithFailure = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
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
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: null,
      },
    },
  },
}

export const submitOfferOrderWithFailureCardDeclined = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card was declined."}',
      },
    },
  },
}

export const submitOfferOrderWithFailureInsufficientFunds = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"insufficient_funds","failure_message":"Your card has insufficient funds to complete the purchase."}',
      },
    },
  },
}

export const submitOfferOrderSuccess = {
  ecommerceSubmitOrderWithOffer: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
      },
    },
  },
}
