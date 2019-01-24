export const initialOfferSuccess = {
  ecommerceAddInitialOfferToOrder: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        __typename: "BuyOrder",
        id: "1234",
        mode: "BUY",
        itemsTotalCents: 400,
        totalListPriceCents: 600,
        totalListPrice: "$6.00",
        myLastOffer: {
          id: "2345",
          amountCents: 400,
        },
        lastOffer: null,
      },
    },
  },
}

export const initialOfferFailedCannotOffer = {
  ecommerceAddInitialOfferToOrder: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "cant_offer",
        data: null,
      },
    },
  },
}

export const initialOfferFailedAmountIsInvalid = {
  ecommerceAddInitialOfferToOrder: {
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
