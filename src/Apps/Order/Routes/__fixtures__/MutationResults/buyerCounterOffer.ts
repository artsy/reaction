import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import moment from "moment"

export const buyerCounterOfferSuccess = {
  ecommerceBuyerCounterOffer: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        ...OfferOrderWithShippingDetails,
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
      },
    },
  },
}
export const buyerCounterOfferFailed = {
  ecommerceBuyerCounterOffer: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "invalid_amount_cents",
        data: null,
      },
    },
  },
}
