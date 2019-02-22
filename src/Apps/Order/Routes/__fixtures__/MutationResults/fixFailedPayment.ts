import { OfferOrderWithShippingDetailsAndNote } from "Apps/__tests__/Fixtures/Order"

export const fixFailedPaymentSuccess = {
  ecommerceFixFailedPayment: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetailsAndNote,
      },
    },
  },
}

export const fixFailedPaymentFailure = {
  ecommerceFixFailedPayment: {
    orderOrError: {
      error: {
        type: "processing",
        code: "capture_failed",
        data: "Failed to capture payment",
      },
    },
  },
}

export const fixFailedPaymentInsufficientInventoryFailure = {
  ecommerceFixFailedPayment: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: "No moar artwork (╯°□°）╯︵ ┻━┻",
      },
    },
  },
}
