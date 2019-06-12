import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { DateTime } from "luxon"

export const buyerCounterOfferSuccess = {
  ecommerceBuyerCounterOffer: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetails,
        stateExpiresAt: DateTime.local()
          .plus({ days: 1 })
          .toString(),
      },
    },
  },
}
export const buyerCounterOfferFailed = {
  ecommerceBuyerCounterOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "invalid_amount_cents",
        data: null,
      },
    },
  },
}
