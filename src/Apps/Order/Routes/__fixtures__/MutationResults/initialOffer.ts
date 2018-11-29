export const initialOfferSuccess = {
  ecommerceAddInitialOfferToOrder: {
    orderOrError: {
      order: {
        id: "1234",
        itemsTotalCents: 400,
        totalListPriceCents: 600,
        lastOffer: {
          id: "2345",
          amountCents: 400,
        },
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
