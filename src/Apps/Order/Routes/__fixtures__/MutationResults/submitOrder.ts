import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const submitOrderWithFailure = {
  ecommerceSubmitOrder: {
    orderOrError: {
      error: {
        type: "validation",
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
      },
    },
  },
}

export const submitOrderWithFailureCardDeclined = {
  ecommerceSubmitOrder: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card was declined.","decline_code":"card_declined"}',
      },
    },
  },
}

export const submitOrderWithFailureInsufficientFunds = {
  ecommerceSubmitOrder: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card has insufficient funds to complete the purchase.","decline_code":"insufficient_funds"}',
      },
    },
  },
}

export const submitOrderWithVersionMismatchFailure = {
  ecommerceSubmitOrder: {
    orderOrError: {
      error: {
        type: "processing",
        code: "artwork_version_mismatch",
        data: null,
      },
    },
  },
}

export const submitOrderWithNoInventoryFailure = {
  ecommerceSubmitOrder: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: null,
      },
    },
  },
}

export const submitOrderSuccess = {
  ecommerceSubmitOrder: {
    orderOrError: {
      order: {
        ...BuyOrderWithShippingDetails,
        state: "SUBMITTED",
      },
    },
  },
}

export const submitOrderWithMissingInfo = {
  ecommerceSubmitOrder: {
    orderOrError: {
      error: {
        type: "processing",
        code: "missing_required_info",
        data: null,
      },
    },
  },
}
