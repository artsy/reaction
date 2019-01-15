export const initialOfferSuccess = {
  ecommerceAddInitialOfferToOrder: {
    orderOrError: {
      order: {
        id: "1234",
        itemsTotalCents: 400,
        totalListPriceCents: 600,
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
      error: {
        type: "validation",
        code: "invalid_amount_cents",
        data: null,
      },
    },
  },
}
