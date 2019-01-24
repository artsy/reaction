import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const submitOrderWithFailure = {
  ecommerceSubmitOrder: {
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

export const submitOrderWithVersionMismatchFailure = {
  ecommerceSubmitOrder: {
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

export const submitOrderWithNoInventoryFailure = {
  ecommerceSubmitOrder: {
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

export const submitOrderSuccess = {
  ecommerceSubmitOrder: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
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
